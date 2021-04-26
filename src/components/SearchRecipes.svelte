<script>
    import recipeData from '../json/recipes.json';
    import { Card, CardBody, CardFooter } from 'sveltestrap';
    import IoMdHeart from 'svelte-icons/io/IoMdHeart.svelte';
    import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';
    import Modal from "./Modal.svelte"

    // -------------- modal -------------- //
    let modal
    let selectedRecipe = {} // holds whatever recipe the user selects - used in recipe modal

    //updates recipe when user clicks on title of recipe in card
    function displayRecipe(recipe) {
        selectedRecipe = recipe;
    }
    // -------------- modal end -------------- //

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

    <div class="section-title">Find New Recipes</div>
    <input class="search-input" type="text" bind:value={query}>

    <div class="card-container">
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

<style>
    .section-title {
		margin-bottom: 10px;
		font-size: 1.4rem;
		color: darkgreen;
	}
    .search-input {
        width: 300px;
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
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .icon {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
    /* ----------- CARD STYLING ------------ */
    
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