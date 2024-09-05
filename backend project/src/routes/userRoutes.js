const express = require('express');
const router = express.Router();
const create_login = require('../controllers/create_login');
const test = require('../controllers/test')

// เส้นทางสำหรับสร้างผู้ใช้ใหม่ /users/create
router.post('/create', create_login.createUser);

// เส้นทางสำหรับ /users/test ที่เรียกใช้ฟังก์ชัน testApi
router.get('/test', test.testApi);



module.exports = router;
