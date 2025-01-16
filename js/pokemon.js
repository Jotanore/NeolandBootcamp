import POKEMONS from '../src/pokemon/pokedex.json' with { type: 'json'};

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);


  console.log(POKEMONS);

  readPokemonsList();
  buscarPokemon(5);

  function readPokemonsList(){
    const LISTA = document.getElementsByClassName('pokegallery')[0];

    for(let i = 0; i < POKEMONS.length; i++){

        let pokemonId = POKEMONS[i].id
        let liElement = document.createElement('li');
        liElement.className = 'pokemon-card'

        let h1Element = document.createElement('h1');
        h1Element.innerText = POKEMONS[i].name.english;

        let aElement = document.createElement('a')
        aElement.href = './ficha.html?id=' + pokemonId

        let figElement = document.createElement('figure');

        let imgElement = document.createElement('img');
        imgElement.src = `../src/pokemon/images/${String(i+1).padStart(3, '0')}.png`;

        let tagListElement = document.createElement('p');

        if (pokemonId === 662) {
          pokemonId = pokemonId - 'r';
        }
        if (pokemonId === 740) {
          pokemonId = pokemonId - 'le';
        }

        let figcaptionElement = document.createElement('figure');
        figcaptionElement.innerText = `Nº ${String(i).padStart(3, '0')}`;

        tagListElement.className = 'taglist';

        for (let j = 0; j < POKEMONS[i].type.length; j++) {
          let tagItemElement = document.createElement('em')
          let pokemonType = POKEMONS[i].type[j]
          tagItemElement.className = 'tag ' + pokemonType.toLowerCase()
          tagItemElement.innerText = pokemonType
          tagListElement.appendChild(tagItemElement)
        }


        figElement.appendChild(imgElement);
        figElement.appendChild(figcaptionElement);
        aElement.appendChild(figElement);
        liElement.appendChild(aElement)
        liElement.appendChild(h1Element);
        liElement.appendChild(tagListElement)
        LISTA.appendChild(liElement);
    }
  }

  function onDOMContentLoaded(e){
    console.log('ha cargado');
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', onSearch);
  }

  function onSearch(){

    const searchInput = document.getElementById('search');
    const searchText = searchInput.value;
    const listPokemon = buscarPokemon(searchText);
  }

  function buscarPokemon(q){
    let returnValue = [];

    console.log(q)
    if(isNaN(q)){
      for (let pokemon of POKEMONS){
        if(pokemon.name.english.includes(q)){
          returnValue.push(pokemon.name.english);
        }

      }
    }else{

      for(let pokemon of  POKEMONS){
        if(pokemon.id === q){
          returnValue.push(pokemon.name.english);
          console.log(pokemon.name.english)
        }
      }
    }
    console.log(returnValue)
    return returnValue
    
  }