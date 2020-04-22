export const singleTypePokemonHTML = `
<div class="media">
  <img src="https://pokeres.bastionbot.org/images/pokemon/4.png" class="mr-3" id="pokedex-image" alt="pokemon-image">
  <div class="media-body">
    <h5 class="mt-0">
      <strong id="pokemon-name" data-pokemon-name="charmander">Charmander</strong>
      <strong id="pokemon-id" data-pokemon-id="4">[4]</strong>
    </h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Height: 0.6 m</li>
      <li class="list-group-item">Weight: 8.5 kg</li>
      <li class="list-group-item">Type:
        <span class="type fire rounded-pill p-1">Fire</span>
        
      </li>
      <br>
      <ul class="list-group list-group-flush">
        <strong>Base Stats</strong>
        <li class="list-group-item">Speed: 65</li>
        <li class="list-group-item">Special-defense: 50</li>
        <li class="list-group-item">Special-attack: 60</li>
        <li class="list-group-item">Defense: 43</li>
        <li class="list-group-item">Attack: 52</li>
        <li class="list-group-item">Hp: 39</li>
        <li class="list-group-item">Base Experience: 62</li>
      </ul>
    </ul>
  </div>
</div>`;

export const multiTypePokemonHTML = `
<div class="media">
  <img src="https://pokeres.bastionbot.org/images/pokemon/1.png" class="mr-3" id="pokedex-image" alt="pokemon-image">
  <div class="media-body">
    <h5 class="mt-0">
      <strong id="pokemon-name" data-pokemon-name="bulbasaur">Bulbasaur</strong>
      <strong id="pokemon-id" data-pokemon-id="1">[1]</strong>
    </h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Height: 0.7 m</li>
      <li class="list-group-item">Weight: 6.9 kg</li>
      <li class="list-group-item">Type:
        <span class="type poison rounded-pill p-1">Poison</span>
        <span class="type grass rounded-pill p-1">Grass</span>
      </li>
      <br>
      <ul class="list-group list-group-flush">
        <strong>Base Stats</strong>
        <li class="list-group-item">Speed: 45</li>
        <li class="list-group-item">Special-defense: 65</li>
        <li class="list-group-item">Special-attack: 65</li>
        <li class="list-group-item">Defense: 49</li>
        <li class="list-group-item">Attack: 49</li>
        <li class="list-group-item">Hp: 45</li>
        <li class="list-group-item">Base Experience: 64</li>
      </ul>
    </ul>
  </div>
</div>`;
