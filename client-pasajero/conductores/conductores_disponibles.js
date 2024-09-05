const socket = io('http://localhost:5050');

document.addEventListener('DOMContentLoaded', () => {
    const driversList = document.getElementById('drivers-list');
    const destinationInput = document.getElementById('destination');
    const requestButton = document.getElementById('request-trip');

    // Función para actualizar la lista de conductores
    const updateDriversList = (drivers) => {
        driversList.innerHTML = '';
        drivers.forEach(driver => {
            const driverElement = document.createElement('div');
            driverElement.textContent = `Nombre: ${driver.name}, Placa: ${driver.plate}`;
            driversList.appendChild(driverElement);
        });
    };

    // Escuchar eventos de actualización de conductores
    socket.on('updateDrivers', (drivers) => {
        updateDriversList(drivers);
    });

    // Solicitar viaje
    requestButton.addEventListener('click', () => {
        const destination = destinationInput.value;
        const passengerName = localStorage.getItem('passengerName'); // Suponiendo que también guardas el nombre del pasajero

        socket.emit('requestTrip', { name: passengerName, destination: destination });

        // Redireccionar a la página de "viaje en proceso"
        window.location.href = '../viaje/viaje_en_proceso.html';
    });
});
