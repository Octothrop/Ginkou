import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post('/newAccount/:userId', async function createAccount(req, res) {
    try {
        const userIdCA = parseInt(req.params.userId, 10);
        const { Type, balance } = req.body;
        const account = await prisma.account.create({
            data: {
                userId: userIdCA,
                Type: Type,
                balance: balance
            }
        });
        res.status(201).json(account);
    } catch (err) {
        console.error("Account creation error : " + err);
        res.status(500).json({ error: "Could not create an account" });
    }
});

router.delete('/closeAccount/:accountId', async function closeAccount(req, res) {
    try {
        const accountId: number = parseInt(req.params.accountId, 10);
        await prisma.account.delete({
            where: { accountId }
        });
        res.status(200).json({ message: 'Account deleted sucessfully' });
    } catch (err) {
        console.error("Account deleteion error : " + err);
        res.status(500).json({ error: 'Account could not be deleted.' })
    }
});

router.get('/getAll/:userId', async function getAllAccountOfUser(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const accounts = await prisma.account.findMany({
            where: { userId }
        });
        res.status(200).json(accounts);
    } catch (err) {
        console.error("Account retrival error : " + err);
        res.status(500).json({ error: 'Could not retrive the accounts' });
    }
});

//genrating card number and cvv
const generateCardNumber = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
    return (Math.floor(Math.random() * 10)).toString();
  });
};
const generateCVV = () => {
  return Math.floor(100 + Math.random() * 900).toString(); // Generates a random number between 100 and 999
};

router.get('/createCard/:userId',async function createCard (req, res) {
  const { accountId, expiration } = req.body;

  try {
    const newCard = await prisma.card.create({
      data: {
        accountId: accountId,
        cardNumber: generateCardNumber(),
        expiration: expiration || new Date(new Date().setFullYear(new Date().getFullYear() + 3)), // default to 3 years from now
        cvv: generateCVV()
      },
    });

    res.status(201).json({ message: 'Card created successfully', card: newCard });
  } catch (error) {
    res.status(500).json({ error: 'Error creating card' });
  }
});

export default router;