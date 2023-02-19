import express from 'express';
import mongoose from 'mongoose';
import { routes } from './src/routes/index.js'
import dotenv from 'dotenv';
import { Server } from 'socket.io'
import cors from 'cors';
import http from 'http'
import TextModel from './src/models/text.model.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
dotenv.config();

const server = http.createServer(app)

app.use(cors({
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    origin: ['http://localhost:3000']
}))

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

routes(app)

server.listen(process.env.PORT || 4000, () => {
    console.log("Server is running at port 4000");
});

const io = new Server(server, {
    cors: 'http://localhost:3000'
})

io.on("connection", (socket) => {
    socket.on("client", (data) => {
        socket.emit("server", data)

        const dataChat = new TextModel({ text: data })
        dataChat.save(async (err, docs) => {
            if (err) return response(res, 500, ['SERVER_ERROR', err.message])
            try {
                await docs.save()
            } catch (error) {
                return response(res, 500, ['ERROR_SERVER', error.message])
            }
        })
    });
});