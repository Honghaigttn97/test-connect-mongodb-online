import { response } from '../constants/responseHandler.js'
import TextModel from '../models/text.model.js'

export const listChat = (req, res) => {
    TextModel
        .find()
        .lean()
        .exec((err, docs) => {
            if (err) return response(res, 500, ['ERROR_SERVER', err.message])
            if (!docs) return response(res, 400, ['USER_NOTEXIST'])
            return response(res, 200, [], { docs })
        })
}





