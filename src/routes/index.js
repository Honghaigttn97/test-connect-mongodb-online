import authRoute from './auth.route.js'
import chatRoute from './chat.route.js'

export const routes = (app) => {
    app.use('/auth', authRoute)
    app.use('/list-chat', chatRoute)
}