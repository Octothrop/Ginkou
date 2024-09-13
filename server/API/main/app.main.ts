import express from 'express';
import cors from 'cors';
import { testConnection } from '../services/cc';

import userRoutes from '../controller/user.controller';
import accountRoutes from '../controller/account.controller';
import paymentRoutes from '../controller/transaction.controller';

// creating instances 
const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

//routes
app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api/payment.ginkou.in', paymentRoutes);

//database connectivity test
testConnection();

//server 
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
