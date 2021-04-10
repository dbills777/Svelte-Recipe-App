<script>
    import { Card, CardBody, CardFooter } from 'sveltestrap';
    import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
    import recipeData from '../json/recipes.json';
    import Modal from "./Modal.svelte"
import { each } from 'svelte/internal';

    let modal

    // holds whatever recipe the user selects
    // used in recipe modal
    let selectedRecipe = {}

    //updates recipe when user clicks on title of recipe in card
    function handleClick(recipe) {
        selectedRecipe = recipe;
    }

</script>

<!-- popup that displays whateve recipe is passed into it-->
<!-- modal styling can be found on Modal.svelte-->
<Modal bind:this={modal}> 
    <!-- Individual recipe card - styling can be found below -->
    <div class="modal-card">
        <img class="modal-img" src="{selectedRecipe.image}" alt="anything">
        <div class=modal-info>
            <h3>{selectedRecipe.name}</h3>
            {#each selectedRecipe.ingredients as ingredient}
            <!-- TODO -->
            <!-- update ingredient name so it can be clickable - added to grocery list -->
            <ul>
                <li>{ingredient.name}</li>
            </ul>
            {/each}

            <p>Instructions</p>
            <!-- TODO -->
            <!-- formatting still needs work -->
            {#each selectedRecipe.instructions as instruction, i}
                <p>step {i+1}: {instruction}</p>
            {/each}
        </div>
    </div>
</Modal>


<div class="recipe-container">
    {#each recipeData as recipe}
    <div class="recipe-card">
        <img class="recipe-img" src="{recipe.image}" alt="anything">
        <div class="recipe-info">
            <h5 on:click={handleClick(recipe), modal.show()}>{recipe.name}</h5>
        </div>
    </div>

{/each}
</div>

<!-- <div class="favorites-main">
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
</div> -->

<style>
    .modal-card {
        display: flex;
    }

    .modal-info {
        margin-left: 1rem;
    }
    .modal-img {
        width: 40%;
        height: 600px;
        object-fit: cover;
    }
    .recipe-container {
        display: flex;
        flex-wrap: wrap;
    }
    .recipe-card {
        width: 300px;
        margin: 1rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .recipe-img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    .recipe-info {
        padding: .5rem;
    }

    .recipe-info h5 {
        margin: .5rem;
    }

    .recipe-info h5:hover {
        cursor: pointer;
        text-decoration: underline;
    }

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