const socket = io('http://localhost:5050');

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    localStorage.setItem('passengerName', name);
    window.location.href = './conductores/conductores_disponibles.html';
});