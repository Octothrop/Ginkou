import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.post('/newUser', async function createUser(req, res) {
    try {
        const { firstName, lastName, DOB, email, address, password, Role } = req.body;
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                DOB,
                email,
                address,
                password,
                Role
            },
        });
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.delete('/deleteUser/:userId', async function removeUser(req, res) {
    try {
        const userDelId: number = parseInt(req.params.userId, 10);
        await prisma.user.delete({
            where: { userId: userDelId }
        });
        res.status(200).json('Deleted user sucessfully')
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

router.get('/findAllUsers', async function getAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all users' })
    }
});

router.get('/getUser/:userId', async function getUserById(req, res) {
    try {
        const userIdFind: number = parseInt(req.params.userId, 10);
        const user = await prisma.user.findFirst({
            where: {
                userId: userIdFind
            }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    } catch (err) {
        res.status(500).json("Internal server error");
    }
});

router.get('/getUser/account/:accountId', async function getUserById(req, res) {
    try {
        const accountIdFind = parseInt(req.params.accountId, 10);
        const account = await prisma.account.findUnique({
            where: {
                accountId: accountIdFind
            },
            include: {
                user: true
            }
        });

        if (account && account.user) {
            res.status(200).json(account.user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/user-login', async function loginUser(req, res) {
    try {
        const { firstName, lastName, password } = req.body;
        const user = await prisma.user.findFirst({
            where:{
                firstName, 
                lastName,
                password
            }
        });

        if (user){
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'user not found, invalid credentials'});
        }

    } catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
    
})

export default router;