// I created the new file to test the authentication for our login part 
import jwt from 'jsonwebtoken';

// Secret key to verify JWT 
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to authenticate the token and protect routes
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Get the token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;  
        next();  
    });
};
