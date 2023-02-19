import UserModel from '../models/user.model.js'
import { response } from '../constants/responseHandler.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// global variables
const saltRounds = 10

export const profile = (req, res) => {

    const userId = req.userId

    UserModel
        .findOne({ _id: userId }, `-password -__v`)
        .lean()
        .exec((err, docs) => {
            if (err) return response(res, 500, ['ERROR_SERVER', err.message])
            if (!docs) return response(res, 400, ['USER_NOTEXIST'])
            return response(res, 200, [], { docs })
        })
}

export const signup = async (req, res) => {
    const { fullname, email, username, password } = req.body;
    const checkEmail = await UserModel.findOne({ email: email });
    if (checkEmail) return response(res, 400, ['EMAIL_EXIST'])

    //hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return response(res, 500, ['ERROR_SERVER', err])
        const infoUser = {
            ...req.body,
            password: hash
        }
        const data = new UserModel(infoUser)
        data.save(async (err, docs) => {
            if (err) return response(res, 500, ['SERVER_ERROR', err.message])
            try {
                await docs.save()
                return response(res, 200, [], { fullname, email, username })
            } catch (error) {
                return response(res, 500, ['ERROR_SERVER', error.message])
            }
        })

    })
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const checkEmail = await UserModel.findOne({ email: email })
    if (!checkEmail) return response(res, 500, 'Email not found!')
    bcrypt.compare(password, checkEmail.password, (err, result) => {
        if (err) return response(res, 500, err)
        if (result) {
            return response(res, 200, 'Login success!', { token: createToken(checkEmail._id) })
        } else {
            return response(res, 400, 'Password error')
        }

    })


}


export const createToken = (userId) => {
    var token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
    return token
}
