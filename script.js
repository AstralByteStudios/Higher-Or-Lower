let currentOptions;
let nextOptions;
let isDarkMode = false;
let data;  // Necesitas tener acceso global a tus datos

fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;  // Almacena los datos globalmente
        startGame(data);
    })
    .catch(error => console.error('Error cargando datos:', error));

function startGame(data) {
    currentOptions = getRandomOptions(data);
    showOptions();

    document.querySelector('#buttons button').addEventListener('click', () => {
        nextOptions = getRandomOptions(data);
        showOptions();
    });
}

function showOptions() {
    document.getElementById('image1').src = currentOptions[0].url;
    document.getElementById('image2').src = currentOptions[1].url;

    document.getElementById('buttons').children[0].textContent = currentOptions[0].name;
    document.getElementById('buttons').children[1].textContent = currentOptions[1].name;
}

function getRandomOptions(data) {
    let option1, option2;
    do {
        option1 = data[Math.floor(Math.random() * data.length)];
        option2 = data[Math.floor(Math.random() * data.length)];
    } while (option1 === option2);

    currentOptions = [option1, option2];

    return [option1, option2];
}

function guess(action) {
    const isCorrect = action === 'higher' && nextOptions[1].value > nextOptions[0].value;

    if (isCorrect) {
        // Si es correcto, cargar nuevas opciones aleatorias diferentes
        do {
            nextOptions = getRandomOptions(data);
        } while (nextOptions.some(option => option === currentOptions[0] || option === currentOptions[1]));

        showOptions();
    } else {
        // Si es incorrecto, mostrar mensaje y reiniciar el juego si es necesario
        alert('¡Has perdido! Reinicia el juego.');
        // Puedes agregar lógica adicional para reiniciar el juego aquí si lo deseas.
    }
}