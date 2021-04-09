<script>
	import { Card, CardBody, CardFooter, Icon } from 'sveltestrap';
    import recipeData from '../json/recipes.json';
</script>

<div class="favorites">
    <div class="section-title">Favorites</div>
    <div class="favorites-section">
        {#each recipeData as recipe, i}
            {#if i < 3}
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
        {/each}
    </div>
    <div class="view-all">
        <a href="#">View All</a>
    </div>
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
	.view-all {
		text-align: end;
		padding-top: 10px;
	}
</style>