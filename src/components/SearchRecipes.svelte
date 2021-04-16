<script>
    import recipeData from '../json/recipes.json';
    import { Card, CardBody, CardFooter } from 'sveltestrap';
    import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
    import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';


    let query;
    let foundRecipes = [];
    let user_message = '';

    $: {
        const handleSearch = () => {
            console.log(query, 'called')
            console.log(recipeData)
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
        recipe.favorite = true;
        recipeFavorites = recipeFavorites.filter(recipe => recipe.favorite);
        message = `Successfully added ${recipe.name} to favorites.`
        user_message = true;
        setTimeout(() => {
            user_message = false;
        }, 5000);
    }


</script>

<div>
    <div class="section-title">Find New Recipes</div>
    <input class="search-input" type="text" bind:value={query}>
    {#each foundRecipes as recipe}
        <Card>
            <CardBody>
                <img class="card-image" src="{recipe.image}" alt="anything">
            </CardBody>
            <CardFooter>
                <div class="footer">
                    <p>{recipe.name}</p>
                    <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                        <IoMdHeartEmpty />
                    </div>
                </div>
            </CardFooter>
        </Card>
    {/each}
</div>

<style>
    .section-title {
		margin-bottom: 10px;
		font-size: 1.4rem;
		color: darkgreen;
	}
    .search-input {
        width: 300px;
    }
</style>