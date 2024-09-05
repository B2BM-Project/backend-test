const bcrypt = require('bcrypt');
const connection = require('../config/database');

const createUser = async (req, res) => {
    const { username, password, email, display_name, profile_img, role, total_score, certificate_name } = req.body;

    // ตรวจสอบว่าข้อมูลจำเป็นถูกส่งมาหรือไม่
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required.' });
    }

    try {
        // แฮชรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // เพิ่มผู้ใช้ลงในฐานข้อมูล
        connection.query(
            "INSERT INTO users (username, password, email, display_name, profile_img, role, total_score, certificate_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [username, hashedPassword, email, display_name || null, profile_img || null, role || null, total_score || null, certificate_name || null],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting", err);
                    return res.status(400).json({ message: 'Error while creating user.' });
                }
                return res.status(201).json({ message: "New user successfully created" });
            }
        );
    } catch (error) {
        console.error("Error hashing password", error);
        return res.status(500).json({ message: 'Error processing request.' });
    }
};


module.exports = {
    createUser,
   
};
