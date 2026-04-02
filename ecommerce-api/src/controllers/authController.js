import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId, displayName, role) => {
    return jwt.sign({ userId, displayName, role },
        process.env.JWT_SECRET,
        { expiresIn: '1m', }
    );
};

const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d', }
    );
    return { token: refreshToken, userId };
};

const generatePassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const checkUserExist = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

const registre = async (req, res, next) => {
    try {
        const { email, password, displayName, phone } = req.body;
        const userExist = await checkUserExist(email);

        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await generatePassword(password);
        const role = 'guest';

        const newUser = new User({
            displayName,
            email,
            password: hashPassword,
            role,
            phone
        });

        await newUser.save();
        res.status(201).json({ displayName, email, phone });
    } catch (error) {
        next(error);
    }
};
