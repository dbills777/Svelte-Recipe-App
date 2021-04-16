<script>
    import recipeData from '../json/recipes.json';
    import { Card, CardBody, CardFooter } from 'sveltestrap';
    import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
    import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';


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

<style>
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