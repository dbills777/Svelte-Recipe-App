<script>
  import { Router, Route, Link } from "svelte-navigator";
  import ShoppingList from "./components/ShoppingList.svelte";
  import FavoritesLanding from "./components/FavoritesLanding.svelte";
  import Favorites from "./components/Favorites.svelte";
  import recipeData from "./json/recipes.json";
  import _ from "lodash";
import SearchRecipes from "./components/SearchRecipes.svelte";
import NewRecipe from "./components/NewRecipe.svelte";
  console.log(recipeData);
</script>

<main>
  <Router>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<Link class="navbar-brand" to="/">Home</Link>

	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
	 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
        <Link class="nav-link" to="/favorites">Favorites</Link>
			</li>
			<li class="nav-item">
        <Link class="nav-link" to="/shoppinglist">ShoppingList</Link>
			</li>
			<li class="nav-item">
      <Link class="nav-link" to="/newRecipe">New Recipe</Link>
			</li>
		</ul>
		<form class="form-inline my-2 my-lg-0">
			<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
			<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
		</form>
	</div>
</nav>
    <header>
      <nav>
      </nav>
    </header>

    <div class="home-view">
      <Route path="/">
        <SearchRecipes />
        <FavoritesLanding />
	    </Route>

      <Route path="/favorites">
        <h3>Favorites.svelte</h3>
        <Favorites />
      </Route>

      <Route path="/shoppinglist">
        <ShoppingList />
      </Route>
      <Route path="/newRecipe">
        <NewRecipe />
      </Route>

    </div>
  </Router>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
  }
</style>
