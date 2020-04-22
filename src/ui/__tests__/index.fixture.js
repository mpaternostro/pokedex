export default `<nav class="navbar navbar-expand-md navbar-light bg-light m-3">
  <a class="navbar-brand" href="#">Pokédex</a>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" id="home-button" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="random-button" href="#">Random</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" id="search-pokemon">
      <!-- ERROR -->
      <input class="form-control mr-sm-4" type="search" placeholder="Search Pokémon" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  </div>
</nav>
<div class="d-flex p-2 justify-content-between">
  <!-- POKEDEX -->
  <div id="pokedex" class="d-flex flex-column flex-fill ml-5 mr-5">
    <!-- SPINNER OR POKEMON -->
  </div>
  <div id="table" class="d-flex flex-column flex-fill ml-5 mr-5">
    <!-- TABLE -->
    <table class="table table-striped mb-0">
      <thead>
        <tr>
          <th scope="col" name="sprite"></th>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">HP</th>
          <th scope="col">Atk</th>
          <th scope="col">Def</th>
        </tr>
      </thead>
      <tbody id="pokemon-table">
      </tbody>
    </table>
    <!-- PAGINATOR -->
    <nav aria-label="table-navigation" class="align-self-center" id="paginator">
    </nav>
  </div>`;
