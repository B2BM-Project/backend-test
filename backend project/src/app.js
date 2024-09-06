const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); // โหลดไฟล์ .env ในไฟล์หลัก 

app.use(express.json());
app.use('/users', userRoutes);

app.listen(5000, () => console.log('Server is Running on port 5000'));
