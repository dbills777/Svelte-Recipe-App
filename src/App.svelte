<script>
  import { Router, Route, Link } from "svelte-navigator";
  import ShoppingList from "./components/ShoppingList.svelte";
  import FavoritesLanding from "./components/FavoritesLanding.svelte";
  import Favorites from "./components/Favorites.svelte";
  import recipeData from "./json/recipes.json";
  import _ from "lodash";
  import { Card, CardBody, CardFooter } from 'sveltestrap';
  import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
  import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';
  import SearchRecipes from "./components/SearchRecipes.svelte";
  import NewRecipe from "./components/NewRecipe.svelte";
  let query;
    let foundRecipes = [];
    let user_message = false;
    let success;
    let message;

    let initialRecipes = recipeData.slice(0, 6)

    $: {
        const handleSearch = () => {
            console.log(query, 'called');
            console.log(recipeData);
            let filtered = recipeData.filter(recipe => recipe.name.toLowerCase().startsWith(query))
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
    <div class="search-section">
        {#if !query}
            {#each initialRecipes as recipe}
                <Card>
                    <CardBody>
                        <img class="card-image" src="{recipe.image}" alt="anything">
                    </CardBody>
                    <CardFooter>
                        <div class="footer">
                            <p>{recipe.name}</p>
                            <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                                {#if recipe.favorite}
                                    <IoMdHeart />
                                {:else}
                                    <IoMdHeartEmpty />
                                {/if}
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            {/each}
        {:else}
            {#each foundRecipes as recipe}
                <Card>
                    <CardBody>
                        <img class="card-image" src="{recipe.image}" alt="anything">
                    </CardBody>
                    <CardFooter>
                        <div class="footer">
                            <p>{recipe.name}</p>
                            <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                                {#if recipe.favorite}
                                    <IoMdHeart />
                                {:else}
                                    <IoMdHeartEmpty />
                                {/if}
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            {/each}
        {/if}
    </div>
    {#if user_message}
        <div class:green={success} class:red={!success}>
            {message}
        </div>
    {/if}
</div>
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
</style>
