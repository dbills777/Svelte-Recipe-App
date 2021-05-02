<script>
  import { Router, Route, Link } from "svelte-navigator";
  import ShoppingList from "./components/ShoppingList.svelte";
  import ShoppingListLanding from './components/ShoppingListLanding.svelte';
  import FavoritesLanding from "./components/FavoritesLanding.svelte";
  import Favorites from "./components/Favorites.svelte";
//   import recipeData from "./json/recipes.json";
  import _ from "lodash";
  import { Card, CardBody, CardFooter } from 'sveltestrap';
  import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
  import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';
  import SearchRecipes from "./components/SearchRecipes.svelte";
  import NewRecipe from "./components/NewRecipe.svelte";
  import Modal from "./components/Modal.svelte"

import recipeStore from "./RecipeStore";

   let recipeList = []
    recipeStore.subscribe((data) => { // keeps track of updates to the store, sends data to "grocery list which can then be looped through/displayed"
        recipeList = data
    })
=======
  import recipeStore from "./RecipeStore"

// ------- pulling data from store ------- //
let recipeData = []
recipeStore.subscribe((data) => {
    recipeData = data
})
// ------- pulling data from store ------- //


  let query;
    let foundRecipes = [];
    let user_message = false;
    let success;
    let message;

    let initialRecipes = recipeList.slice(0, 10)

    $: {
        const handleSearch = () => {
            console.log(recipeList);
            let filtered = recipeList.filter(recipe => recipe.name.toLowerCase().startsWith(query))
            foundRecipes = filtered;
        }
        if (query) {
            handleSearch()
        } else {
            foundRecipes = [];
        }
    }

    const onFavoriteClick = (recipe) => {
        recipe.favorite = !recipe.favorite;
        if (recipe.favorite) {
            message = `Successfully added ${recipe.name} to favorites.`;
            success = true;
        } else {
            success = false;
            message = `Successfully removed ${recipe.name} from favorites.`;
        }
        user_message = true;
        setTimeout(() => {
            user_message = !user_message;
        }, 2500);
        if (query) {
            foundRecipes = foundRecipes;
        } else {
            initialRecipes = initialRecipes;
        }

    }
     // -------------- modal -------------- //
    let modal
    let selectedRecipe = {} // holds whatever recipe the user selects - used in recipe modal

    //updates recipe when user clicks on title of recipe in card
    function displayRecipe(recipe) {
        selectedRecipe = recipe;
    }
    // -------------- modal end -------------- //

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
			<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" bind:value={query}>
			<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
		</form>
	</div>
</nav>

    <div class="home-view">
      <Route path="/">
        <div>
    <div class="section-title">Find New Recipes</div>
    <input class="search-input" type="text" bind:value={query}>
<!-- popup that displays whateve recipe is passed into it-->
<!-- modal styling can be found on Modal.svelte-->
<Modal bind:this={modal}>
    <!-- Individual recipe card - styling can be found below -->
    <div class="modal-card">
        <img class="modal-img" src="{selectedRecipe.image}" alt="anything">
        <div class=modal-info>
            <h3 class="recipe-title">{selectedRecipe.name}</h3>

            <!-- TODO: add styling or confirmation that ingredient has be added to grocery list after click-->
            <table>
                <tr>
                  <th>Ingredient</th>
                  <th>Amount</th>
                  <th>On List</th>
                </tr>
                {#each selectedRecipe.ingredients as ingredient, i}
                <tr class="table-fade">
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity} {ingredient.unit}</td>
                <td>ingredient: {i}</td>
                </tr>
                {/each}
              </table>

            <div>
                <h5>Instructions</h5>
                {#each selectedRecipe.instructions as instruction, i}
                    <p><b>step</b> {i+1}: {instruction}</p>
                {/each}
            </div>
        </div>
    </div>
</Modal>
    <div class="search-section">
        {#if !query}
            {#each initialRecipes as recipe}
                <div class="recipe-card">
                    <img class="recipe-card-img" src="{recipe.image}" alt="anything">
                    <div class="recipe-card-info">
                        <h5 on:click={displayRecipe(recipe), modal.show()}>{recipe.name}</h5>
                        <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                            {#if recipe.favorite}
                                <IoMdHeart />
                            {:else}
                                <IoMdHeartEmpty />
                            {/if}
                        </div>
                    </div>
                </div>

            {/each}
        {:else}
            {#each foundRecipes as recipe}
                <div class="recipe-card">
                    <img class="recipe-card-img" src="{recipe.image}" alt="anything">
                    <div class="recipe-card-info">
                        <h5 on:click={displayRecipe(recipe), modal.show()}>{recipe.name}</h5>
                        <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                            <IoMdHeart />
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    </div>

    {#if user_message}
        <div class:green={success} class:red={!success}>
            {message}
        </div>
    {/if}
</div>
    <br>
    <br>
    <FavoritesLanding />
    <ShoppingListLanding />
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
  .section-title {
		margin-bottom: 10px;
		font-size: 1.4rem;
		color: darkgreen;
	}
    .search-input {
        width: 300px;
    }
    .search-section {
        display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
    }
    .footer {
        display: flex;
        justify-content: space-between;
    }
    .icon {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
    .green {
        color: green;
    }
    .red {
        color: crimson;
    }
    /* ----------- CARD STYLING ------------ */
    .recipe-card {
        width: 325px;
        margin: 1rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    .recipe-card-img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    .recipe-card-info {
        padding: .75rem;
        display: flex;
        justify-content: space-between;
    }
    .recipe-card-info h5 {
        margin: .5rem;
        font-size: 1rem;
        font-weight: 400;
    }
    .recipe-card-info h5:hover {
        cursor: pointer;
        text-decoration: underline;
    }
    .icon {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
    /* ----------- CARD STYLING END ------------ */

    /* ----------- MODAL STYLING ------------ */
    h5 {
        margin-top: 0;
        margin-bottom: 5px;
    }

    table {
        padding: .5rem;
    }

    .table-fade {
        transition: ease-in-out .15s;
    }

    .table-fade:hover {
        cursor: pointer;
        background-color: rgb(224, 224, 224);
    }
    .table-fade:selected {
        background-color: green;
        color: white;
    }

    td {
        font-size: 10px;
        padding: 4px;
    }
    th {
        padding-left: 0;
    }

    .recipe-title {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    .modal-card {
        display: flex;
    }
    .modal-info {
        margin-left: 1rem;
        min-width: 50%;
    }
    .modal-info p {
        margin: 0;
        font-size: .75rem;
    }
    .modal-img {
        width: 40%;
        min-height: 600px;
        height: 100%;
        object-fit: cover;
    }
    /* ----------- MODAL STYLING END ------------ */
</style>
