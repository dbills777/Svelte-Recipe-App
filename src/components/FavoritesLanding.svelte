<script>
	import { Card, CardBody, CardFooter } from 'sveltestrap';
    import recipeData from '../json/recipes.json';
    import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';
    import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';

    let recipeFavorites = recipeData.filter(recipe => recipe.favorite);
    let user_message = false;
    let message = '';

    const onFavoriteClick = (recipe) => {
        recipe.favorite = false;
        recipeFavorites = recipeFavorites.filter(recipe => recipe.favorite);
        message = `Successfully removed ${recipe.name} from favorites.`
        user_message = true;
        setTimeout(() => {
            user_message = false;
        }, 5000);
    }
</script>

<div class="favorites">
    <div class="section-title">Favorites</div>
    <div class="{recipeFavorites.length === 2 ? 'favorites-condensed' : 'favorites-section'}">
        {#if recipeFavorites.length === 0}
            <p>Go add some favorites!</p>
        {/if}
        {#each recipeFavorites as recipe, i}
            {#if i < 3}
                <Card>
                    <CardBody>
                        <img src="{recipe.image}" alt="anything">
                    </CardBody>
                    <CardFooter>
                        <div class="footer">
                            <p>{recipe.name}</p>
                            <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                                <IoMdHeart />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            {/if}
        {/each}
    </div>
    <div class="view-all">
        <a href="#">View All</a>
    </div>
    {#if user_message}
        <div class="message">
            <p>{message}</p>
        </div>
    {/if}
</div>

<style>
    .section-title {
		margin-bottom: 10px;
		font-size: 1.4rem;
		color: darkgreen;
	}
	.favorites-section {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
    }
    .favorites-condensed {
        display: flex;
        justify-content: space-evenly;
    }
	.view-all {
		text-align: end;
		padding-top: 10px;
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
    .message {
        color: crimson;
    }
</style>