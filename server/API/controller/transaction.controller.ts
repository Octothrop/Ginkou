import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post('/pay/:userId', async function makePayment(req, res) {

    const userId: number = parseInt(req.params.userId, 10);
    let { amount, fromAccountId, toAccountId, mode } = req.body;

    try {
        const userRole = await prisma.user.findUnique({
            where: { userId: userId },
            select: { Role: true }
        });

        await prisma.$transaction(async (prisma) => {
            // Sender
            const fromAccount = await prisma.account.findUnique({
                where: { accountId: fromAccountId }
            });

            // Reciever
            const toAccount = await prisma.account.findUnique({
                where: { accountId: toAccountId }
            });

            if (!fromAccount) {
                fromAccountId = 3;
            }
            if (!toAccount) {
                toAccountId = 3;
            }

            // Create transaction
            const transaction = await prisma.transaction.create({
                data: {
                    amount: amount,
                    fromAccountId: fromAccountId,
                    toAccountId: toAccountId,
                    mode: mode,
                    remark: ''
                }
            });

            // Check account balances and perform transaction
            if (!fromAccount || !toAccount) {
                await prisma.transaction.update({
                    where: { transactionId: transaction.transactionId },
                    data: {
                        status: "FAILED",
                        remark: "Account not found"
                    }
                });
                res.status(400).json({ error: 'Account not found - This transaction cannot be performed' });
            } else if (userRole?.Role != "ADMIN" && fromAccount.balance - amount < 100) {

                await prisma.transaction.update({
                    where: { transactionId: transaction.transactionId },
                    data: {
                        status: "FAILED",
                        remark: "Insufficient balance"
                    }
                });
                res.status(400).json({ error: 'Insufficient balance - This transaction cannot be performed' });
            } else {

                if (userRole?.Role != "ADMIN") {
                    // Update sender account
                    await prisma.account.update({
                        where: { accountId: fromAccountId },
                        data: { balance: fromAccount.balance - amount }
                    });
                }

                // Update receiver account
                await prisma.account.update({
                    where: { accountId: toAccountId },
                    data: { balance: toAccount.balance + amount }
                });

                // Update status of transaction
                await prisma.transaction.update({
                    where: { transactionId: transaction.transactionId },
                    data: {
                        status: "SUCCESS",
                        remark: "Payment successful"
                    }
                });

                res.status(200).json(transaction);
            }
        });
    } catch (err) {
        console.error("Error in payment: " + err);

        // Create an error transaction log
        const transaction = await prisma.transaction.create({
            data: {
                amount: amount,
                fromAccountId: fromAccountId,
                toAccountId: toAccountId,
                mode: mode,
                status: 'FAILED',
                remark: 'Error while processing payment, please try again later'
            }
        });

        res.status(500).json(transaction);
    }
});

router.post("/pay-card", async function performTransactionWithCard(req, res) {
    const { toAccountId, cardNumber, cvv, amount, remark } = req.body;

    try {
        const card = await prisma.card.findUnique({
            where: {
                cardNumber: cardNumber,
            }
        });

        if (!card || card.cvv !== cvv || new Date(card.expiration).getTime() <= Date.now()) {
            return res.status(400).json({ error: 'Invalid card or card expired' });
        }

        const fromAccount = await prisma.account.findUnique({
            where: {
                accountId: card.accountId,
            },
        });

        const toAccount = await prisma.account.findUnique({
            where: {
                accountId: toAccountId,
            },
        });

        if (!fromAccount) {
            return res.status(400).json({ error: 'From account not found' });
        }

        if (!toAccount) {
            return res.status(400).json({ error: 'To account not found' });
        }

        if (fromAccount.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const transaction = await prisma.transaction.create({
            data: {
                amount: amount,
                fromAccountId: fromAccount.accountId,
                toAccountId: toAccountId,
                mode: 'CARD',
                cardId: card.cardId,
                remark: remark || '',
                status: "PENDING"
            }
        });

        await prisma.account.update({
            where: { accountId: fromAccount.accountId },
            data: { balance: fromAccount.balance - amount }
        });

        await prisma.account.update({
            where: { accountId: toAccountId },
            data: { balance: toAccount.balance + amount }
        });

        await prisma.transaction.update({
            where: { transactionId: transaction.transactionId },
            data: {
                status: "SUCCESS",
                remark: "Payment successful"
            }
        });

        res.status(200).json({ message: 'Transaction successful', transaction: transaction });
    } catch (error) {
        res.status(500).json({ error: 'Error processing transaction' });
    }

});


router.get('/allTransaction/:userId', async function getAllUserTransactions(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const accounts = await prisma.account.findMany({
            where: {
                userId: userId
            },
            select: {
                accountId: true
            }
        });
        console.log(accounts);

        const accountIds = accounts.map(account => account.accountId);

        const debitTransactions = await prisma.transaction.findMany({
            where: {
                toAccountId: {
                    in: accountIds
                },
                fromAccountId: {
                    notIn: accountIds
                },
                status: 'SUCCESS'
            }
        });

        const creditTransactions = await prisma.transaction.findMany({
            where: {
                fromAccountId: {
                    in: accountIds
                },
                toAccountId: {
                    notIn: accountIds
                },
                status: 'SUCCESS'
            }
        });

        const selfTransactions = await prisma.transaction.findMany({
            where: {
                fromAccountId: {
                    in: accountIds
                },
                toAccountId: {
                    in: accountIds
                },
                status: 'SUCCESS'
            }
        });

        const failedTransactions = await prisma.transaction.findMany({
            where: {
                AND: [
                    {
                        status: 'FAILED'
                    },
                    {
                        OR: [
                            {
                                fromAccountId: {
                                    in: accountIds
                                }
                            },
                            {
                                toAccountId: {
                                    in: accountIds
                                }
                            }
                        ]
                    }
                ]
            }
        });

        res.status(200).json({
            creditTransactions,
            debitTransactions,
            selfTransactions,
            failedTransactions
        });
    } catch (err) {
        console.error("Error retrieving all transactions: " + err);
        res.status(500).json({ error: "Could not fetch transactions" });
    }
});

router.get('/admin/all', async function getAllTransactions(req, res) {
    try {
        const sucessTransactions = await prisma.transaction.findMany({where: {status: 'SUCCESS'}});
        const failedTransactions = await prisma.transaction.findMany({where: {status: 'FAILED'}});
        res.status(200).json({sucessTransactions, failedTransactions});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "could not fetch all transactions" });
    }
})


export default router;
