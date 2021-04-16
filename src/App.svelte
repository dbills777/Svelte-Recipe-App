<script>
  import { Router, Route, Link } from "svelte-navigator";
  import ShoppingList from "./components/ShoppingList.svelte";
  import FavoritesLanding from "./components/FavoritesLanding.svelte";
  import Favorites from "./components/Favorites.svelte";
  import recipeData from "./json/recipes.json";
  import _ from "lodash";
import SearchRecipes from "./components/SearchRecipes.svelte";
  console.log(recipeData);
</script>

<main>

  <Router>
    <header>
      <nav>
		<Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/shoppinglist">ShoppingList</Link>
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
