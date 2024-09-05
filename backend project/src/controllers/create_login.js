const bcrypt = require('bcrypt');
const connection = require('../config/database');


// ระบบ signup //
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




// ระบบ login //
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // ตรวจสอบว่าข้อมูลจำเป็นถูกส่งมาหรือไม่
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // ค้นหาผู้ใช้ในฐานข้อมูล
        connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            async (err, results, fields) => {
                if (err) {
                    console.error("Error querying the database", err);
                    return res.status(500).json({ message: 'Error processing request.' });
                }

                if (results.length === 0) {
                    // ถ้าไม่พบผู้ใช้
                    return res.status(401).json({ message: 'Invalid username or password.' });
                }

                const user = results[0];

                // เปรียบเทียบรหัสผ่านที่ถูกแฮช
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    // ถ้ารหัสผ่านไม่ตรง
                    return res.status(401).json({ message: 'Invalid username or password.' });
                }

                // หากรหัสผ่านถูกต้อง
                return res.status(200).json({ message: 'Login successful', user });
            }
        );
    } catch (error) {
        console.error("Error comparing password", error);
        return res.status(500).json({ message: 'Error processing request.' });
    }
};


module.exports = {
    createUser,
    loginUser
   
};
