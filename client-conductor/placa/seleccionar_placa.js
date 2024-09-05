const socket = io('http://localhost:5050');

document.addEventListener('DOMContentLoaded', () => {
    const plateButtons = document.querySelectorAll('.plate-btn');
    let selectedPlate = '';

    plateButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedPlate = button.getAttribute('data-plate');
            localStorage.setItem('selectedPlate', selectedPlate); // Store selected plate in localStorage
            window.location.href = '../estado/estado_vehiculo.html'; // Correct relative path
        });
    });
});

