<script>
    import { Card, CardBody, CardFooter } from 'sveltestrap';
    import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
    import recipeData from '../json/recipes.json';

</script>

<div class="favorites-main">
    {#each recipeData as recipe}
        <div class="favorites-card">
            {#if recipe.favorite}
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
        </div>
    {/each}
</div>

<style>
    .favorites-main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .favorites-card {
        margin-bottom: 20px;
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
</style>