const socket = io('http://localhost:5050');

// Update UI with the selected plate
document.getElementById('selectedPlate').textContent = localStorage.getItem('selectedPlate');

// Event listener for activating the vehicle
document.getElementById('activate').addEventListener('click', () => {
    const plate = localStorage.getItem('selectedPlate');
    socket.emit('vehicleStatus', { plate, status: 'activo' });
});

// Event listener for deactivating the vehicle
document.getElementById('deactivate').addEventListener('click', () => {
    const plate = localStorage.getItem('selectedPlate');
    socket.emit('vehicleStatus', { plate, status: 'inactivo' });
});
