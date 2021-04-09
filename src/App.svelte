<script>
	import ShoppingList from './components/ShoppingList.svelte'
	import recipeData from './json/recipes.json';
	import _ from 'lodash';
	export let name;

	const fetchData = async () => {
		let APP_ID = '7a3b527b';
		let API_KEY = 'cff1b76216750fc0f9562b48024b323f';
		let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=pizza`);
		let data = await response.json();
		console.log(data);
	}
	// fetchData();

	console.log(recipeData);


</script>

<main>
	<ShoppingList></ShoppingList>
	<h1>Hello {name}!</h1>
	<input type="text">
</main>

<style>

</style>