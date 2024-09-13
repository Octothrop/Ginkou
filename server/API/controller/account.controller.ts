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

export default router;