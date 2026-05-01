const bcrypt = require('bcrypt');
const db = require('../db');

/**
 * Smart Identity Detection Login Controller
 * Automatically detects if input is Email or Phone and queries accordingly.
 */
exports.login = async (req, res) => {
    const { login_identifier, password } = req.body;

    // 1. Input Validation
    if (!login_identifier || !password) {
        return res.status(400).json({
            status: "error",
            message: "Credentials are required."
        });
    }

    try {
        // 2. Smart Identity Detection using Regular Expressions
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;

        let query = "";
        let identifierType = "";

        if (emailRegex.test(login_identifier)) {
            query = "SELECT * FROM users WHERE email = ?";
            identifierType = "Email";
        } else if (phoneRegex.test(login_identifier)) {
            query = "SELECT * FROM users WHERE phone = ?";
            identifierType = "Phone";
        } else {
            return res.status(400).json({
                status: "error",
                message: "Invalid login identifier format (must be Email or Phone)."
            });
        }

        // 3. Database Strategy: Prepared Statements for security
        const [rows] = await db.execute(query, [login_identifier]);

        if (rows.length === 0) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials."
            });
        }

        const user = rows[0];

        // 4. Security: bcrypt password verification
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials."
            });
        }

        // 5. Success Response: UI/UX Friendly
        return res.status(200).json({
            status: "success",
            message: "Login successful!",
            detected_as: identifierType,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            status: "error",
            message: "An internal server error occurred."
        });
    }
};
