import express from 'express'
import { profile, signup, signin } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = express.Router()

//get info
router.get('/my-profile', verifyToken, profile)

//create
router.post('/signup', signup)

//login
router.post('/signin', signin)

//test token
// router.get('/create-token', createToken)
// router.post('/verify-token', verifyToken)

export default router