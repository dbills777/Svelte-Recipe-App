<script>
	import { Router, Route, Link } from "svelte-navigator";
	import ShoppingList from './components/ShoppingList.svelte';
	import FavoritesLanding from './components/FavoritesLanding.svelte';
	import Favorites from './components/Favorites.svelte';
	import recipeData from './json/recipes.json';
	import _ from 'lodash';
	console.log((recipeData));
</script>

<main>
<Router>
  <header>
    <nav>
      <Link to="/">Favorites</Link>
      <Link to="FavoritesLanding">FavoritesLanding</Link>
      <Link to="ShoppingList">ShoppingList</Link>
    </nav>
  </header>

  <main>
	  <Route path="/">
      <h3>Favorites.svelte</h3>

				<Favorites></Favorites>

	  </Route>


	  <Route path="favorites">
      <h3>Favorites.svelte</h3>

		<Favorites></Favorites>
	</Route>


    <Route path="FavoritesLanding">
      <h3>FavoritesLanding.svelte</h3>
            <FavoritesLanding />
    </Route>
    <Route path="ShoppingList">
      <h3>ShoppingList.svelte</h3>
           <ShoppingList></ShoppingList>
    </Route>


  </main>
</Router>

</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 30px;
	}

	nav{
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
	}

</style>