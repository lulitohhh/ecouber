const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware para manejar CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.static('client-conductor'));
app.use(express.static('client-pasajero'));

let availableDrivers = [];
let tripRequests = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('updateDrivers', availableDrivers);

    socket.on('selectPlate', (data) => {
        const { plate, name } = data;
        availableDrivers = availableDrivers.filter(driver => driver.name !== name);
        availableDrivers.push({ plate, name });
        io.emit('updateDrivers', availableDrivers);
    });

    socket.on('requestTrip', (data) => {
        const { name, destination } = data;
        tripRequests.push({ name, destination });
        io.emit('updateTripRequests', tripRequests);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5050, () => {
    console.log('Server is running on port 5050');
});
