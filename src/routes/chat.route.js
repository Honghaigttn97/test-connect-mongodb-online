import express from 'express'
import { listChat } from '../controllers/chat.controller.js'

const router = express.Router()

//get list
router.get('', listChat)


export default router