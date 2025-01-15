import POKEMONS from '../src/pokemon/pokedex.json' with { type: 'json'};


  console.log(POKEMONS);

  readPokemonsList();

  function readPokemonsList(){
    const LISTA = document.getElementsByClassName('pokegallery')[0];

    for(let i = 0; i < POKEMONS.length; i++){
        let liElement = document.createElement('li');
        liElement.className = 'pokemon-card'

        let h1Element = document.createElement('h1');
        h1Element.innerText = POKEMONS[i].name.english;

        let figElement = document.createElement('figure');
        


        let imgElement = document.createElement('img');
        imgElement.src = `../src/pokemon/thumbnails/${String(i).padStart(3, '0')}.png`;

        let figcaptionElement = document.createElement('figure');
        figcaptionElement.innerText = 'Nº' + numeroImagen;

        figElement.appendChild(imgElement);


        liElement.appendChild(h1Element);
        liElement.appendChild(imgElement);
        LISTA.appendChild(liElement);
    }
  }