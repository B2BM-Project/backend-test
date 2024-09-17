const connection = require('../config/database');

const getUserById = async (req, res) => {
    const { id } = req.params;

    // ตรวจสอบว่าข้อมูลจำเป็นถูกส่งมาหรือไม่
    if (!id) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        // ค้นหาผู้ใช้ในฐานข้อมูลตาม user_id
        const [results] = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // ตรวจสอบผลลัพธ์
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = results;

        // แสดงข้อมูลของ user ทั้งหมดเพื่อตรวจสอบ
        console.log(user);

        // ตรวจสอบว่ามีฟิลด์ username หรือไม่
        if (!user.username) {
            return res.status(500).json({ message: 'Username field is missing in the database.' });
        }

        // ส่งเฉพาะค่า username ของผู้ใช้
        return res.status(200).json({ user });

    } catch (error) {
        console.error("Error processing request", error);
        return res.status(500).json({ message: 'Error processing request.' });
    }
};

module.exports = {
    getUserById
};
