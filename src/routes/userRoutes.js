const express = require('express');
const router = express.Router();
const create_login = require('../controllers/create_login');
const getusers = require('../controllers/con_getusers');
const test = require('../controllers/test')

// เส้นทางสำหรับสร้างผู้ใช้ใหม่ /users/create
router.post('/create', create_login.createUser);

// เส้นทางสำหรับสร้างผู้ใช้ใหม่ /users/create
router.post('/login', create_login.loginUser);

// เส้นทางสำหรับ /users/test ที่เรียกใช้ฟังก์ชัน testApi
router.get('/test', test.testApi);

// เส้นทางสำหรับ /users/user/id ที่เรียกใช้ฟังก์ชัน ค้นหา user ด้วย id
router.get('/user/:id', getusers.getUserById);


module.exports = router;
