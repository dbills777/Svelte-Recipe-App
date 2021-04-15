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

    let groceryList = []

    //updates recipe when user clicks on title of recipe in card
    function displayRecipe(recipe) {
        selectedRecipe = recipe;
    }

    function addGrocery(item) {
        groceryList.push(item)
        console.log('grocery list: ', groceryList)
    }


</script>

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
                </tr>
                {#each selectedRecipe.ingredients as ingredient}
                <tr class="table-fade" on:click={() => addGrocery(ingredient)}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity} {ingredient.unit}</td>
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



<div class="favorites-main">
    {#each recipeData as recipe}
        {#if recipe.favorite}
            <div class="recipe-card">
                <img class="recipe-card-img" src="{recipe.image}" alt="anything">
                <div class="recipe-card-info">
                    <h5 on:click={displayRecipe(recipe), modal.show()}>{recipe.name}</h5>
                    <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                        <IoMdHeart />
                    </div>
                </div>
            </div>
        {/if}
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

    .favorites-main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    /* .favorites-card {
        margin-bottom: 20px;
    }
    .footer {
        display: flex;
        justify-content: space-between;
    } */
    .icon {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
</style>