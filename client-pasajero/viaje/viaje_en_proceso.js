const socket = io('http://localhost:5050');

document.addEventListener('DOMContentLoaded', () => {
    const tripInfo = document.getElementById('trip-info');

    // Escuchar eventos de actualización de solicitudes de viaje
    socket.on('updateTripRequests', (requests) => {
        tripInfo.innerHTML = '';
        requests.forEach(request => {
            const requestElement = document.createElement('div');
            requestElement.textContent = `Nombre: ${request.name}, Destino: ${request.destination}`;
            tripInfo.appendChild(requestElement);
        });
    });
});
