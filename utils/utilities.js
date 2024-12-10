
import jwt from 'jsonwebtoken';





export const GetCookieValues = (token) => {

    let userCookieValues;
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
    if (!token) {
        return false;
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return 'Invalid or expired token';
        }
        userCookieValues = {
            role: user.role,
            id: user.id,
            email: user.email};
    });
    return userCookieValues;
};