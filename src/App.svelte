<script>
	import ShoppingList from './components/ShoppingList.svelte';
	import FavoritesLanding from './components/FavoritesLanding.svelte';
	import Favorites from './components/Favorites.svelte';
	import recipeData from './json/recipes.json';
	import _ from 'lodash';
	export let name;

	console.log(recipeData);


</script>

<main>
	<div class="favorites-landing-section">
		<FavoritesLanding></FavoritesLanding>
	</div>
	
	<div class="shoppinglist-section">
		<ShoppingList></ShoppingList>
	</div>

<!-- <Favorites /> -->

</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 30px;
	}
</style>