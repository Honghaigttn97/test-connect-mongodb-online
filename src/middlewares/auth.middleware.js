import jwt from "jsonwebtoken"
import { response } from '../constants/responseHandler.js'


export const verifyToken = (req, res, next) => {
    const token = req.rawHeaders[1].slice(7);
    jwt.verify(token, '11061997', (err, decoded) => {
        if (err) {
            return response(res, 400, 'Token expired')
        }
        req.userId = decoded.userId;
        return next()
    })
}