<script>
    import { Card, CardBody, CardFooter, Icon } from 'sveltestrap';
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
                        <p>{recipe.name}</p>
                        <Icon name="heart" />
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
</style>