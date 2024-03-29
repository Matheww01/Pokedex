


// let pokeImage = document.querySelector(".card-img-top");
// let pokeText = document.querySelector(".card-text");
// let pokeName = document.querySelector(".card-title");

//Función para crear nueva tarjeta


function newCard() {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('style', 'width: 18rem;');
    // card.style.display = 'flex';
    // card.style.flexDirection = 'column'; 
    // card.style.justifyContent = 'space-between';
    // Crear el contenido de la tarjeta vacía
    let contenido =
        `<img src="${pokeImage}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${pokeName}</h5>
        <p class="card-text">${pokeTipo}</p>
        <button type="button" class="btn btn-outline-primary">Ver más</button>
    </div>`;

    card.innerHTML = contenido;

    // Agregar un controlador de eventos al botón "Ver más"
    let btnVerMas = card.querySelector('.btn');
    btnVerMas.addEventListener('click', createEventHandler(pokeName, pokeImage, pokeTipo,pokeAbilities, pokeHight, pokeWeight));

    let cardContainer = document.querySelector('.cardContainer')
    cardContainer.appendChild(card);
};


// Función de fábrica de eventos para capturar el nombre del Pokémon
function createEventHandler(pokeName, pokeImage, pokeTipo, pokeAbilities, pokeHight, pokeWeight) {
    return function () {
        // Actualizar el contenido del modal con la información específica del Pokémon
        let modalBody = document.querySelector("#modalBody");
        modalBody.innerHTML = `
            <img src="${pokeImage}" class="card-img-top" alt="...">
            <h5 class="card-title">${pokeName}</h5>
            <p class="card-text bg-primary-subtle border border-primary-subtle rounded-3">${pokeTipo}</p>
            <p class="card-text">${pokeAbilities}</p>
            <p class="card-text">${pokeHight}</p>
            <p class="card-text">${pokeWeight}</p>
        `;

        // Mostrar el modal
        let pokemonModal = new bootstrap.Modal(document.querySelector("#pokemonModal"));
        pokemonModal.show();
    };
}

//Llamar a nuestra API

const getData = async () => {
    for (let i = 0; i < 100; i++) {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            let data = await response.json();
            console.log(data);
            pokeImage = data.sprites.front_default;
            pokeName = data.name;
            pokeTipo = (`Type: ${data.types[0].type.name}`);
            abilities = data.abilities.map(ability => ability.ability.name).join(", ");
            pokeAbilities = (`Abilities: ${abilities}`);
            pokeHight = (`Height: ${data.height}`);
            pokeWeight = (`Weight: ${data.weight}`);
            newCard();
        } catch (error) {
            console.error(error);
        }
    }

}

getData();

//Crear la información adicional del pokemon




// const getData = async () => {
//     try {
//         let response = await fetch("https://pokeapi.co/api/v2/pokemon");
//         let data = await response.json();
//         console.log(data);
//         let keys = Object.keys (data.results);
//         console.log(keys.length);
//         for (let i = 0; i < keys.length; i++) {
//             pokeName = data.results[i].name;
//             pokeImage = null;
//             pokeTipo = null;
//             console.log(pokeName);
//             newCard();
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// getData();

