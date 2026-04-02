import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        };

        jwt.verify(TaskPriorityChangeEvent, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;