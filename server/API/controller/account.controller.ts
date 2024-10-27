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

router.put('/forgotPassword', async function changePassword(req, res) {
  try {
    const { email, newPassword } = req.body;
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        password: newPassword
      }
    });
    res.status(200).json('Password updated');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal serevr error');
  }
});

router.put('/closeAccount/:accountId', async function closeAccount(req, res) {
  try {
    const accountId: number = parseInt(req.params.accountId, 10);
    const account = await prisma.account.findUnique({
      where: {
        accountId: accountId
      }
    });
    if (account !== null) {
      await prisma.$transaction(async (prisma) => {
        await prisma.transaction.create({
          data: {
            amount: account.balance,
            fromAccountId: 13,
            toAccountId: accountId,
            mode: 'NEFT',
            remark: 'Admin : Account closure'
          }
        });
        await prisma.account.update({
          where: { accountId: accountId },
          data: {
            accountStatus: 'CLOSED',
            balance: 0
          }
        });
      });
    } else {
      throw new Error('Account not found');
    }
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

router.get('/getAllAccId/:userId', async function getAllAccountOfUserAcc(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);
    const accounts = await prisma.account.findMany({
      where: {
        userId,
        accountStatus: 'APPLIED',
      },
      select: { accountId: true }
    });
    res.status(200).json(accounts);
  } catch (err) {
    console.error("Account retrival error : " + err);
    res.status(500).json({ error: 'Could not retrive the accounts' });
  }
});

router.get('/getAllAccounts', async function getAllAccounts(req, res) {
  try {
    const accounts = await prisma.account.findMany({});
    res.status(200).json(accounts);
  } catch (err) {
    console.error("Account error : " + err);
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

router.post('/createCard/:userId', async function createCard(req, res) {
  const { accountId, type } = req.body;

  try {
    const newCard = await prisma.card.create({
      data: {
        accountId: accountId,
        cardNumber: generateCardNumber(),
        expiration: new Date(new Date().setFullYear(new Date().getFullYear() + 3)), // default to 3 years from now
        type: type,
        cvv: generateCVV()
      },
    });

    res.status(201).json({ message: 'Card created successfully', card: newCard });
  } catch (error) {
    res.status(500).json({ error: 'Error creating card' });
  }
});


router.get('/allCards/:userId', async function getCards(req, res) {
  const userId = parseInt(req.params.userId);

  try {
    const Allcards = await prisma.account.findMany({
      where: { userId },
      select: {
        Card: true
      }
    });
    const cards = Allcards.flatMap(item => item.Card);

    res.status(200).json(cards);
  } catch (err) {
    console.error("Account retrieval error:", err);
    res.status(500).json({ error: 'Could not retrieve the accounts' });
  }
});

export default router;