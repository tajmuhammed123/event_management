const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Config/config');
const http = require('http');
const stripe = require('stripe')('sk_test_51NwHkGSEDFbx4uMAi4gaS8gIKK34IfRc6c1ang04n7KDxk5t8rRyid4fKedWCBqlaBUJeKDMczwzhCtPU1nWriaq00ahzBlJ8c');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const userRouter = require('./Routes/userRoutes');
app.use('/', userRouter);
const adminRouter = require('./Routes/adminRoutes');
app.use('/admin/', adminRouter);
const managerRouter = require('./Routes/mangerRoutes');
app.use('/manager/', managerRouter);

server.listen(4000, () => {
  console.log('server running at 4000');
});
