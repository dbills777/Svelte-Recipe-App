<script>
    import recipeData from '../json/recipes.json';
    import Modal from "./Modal.svelte"
    import groceryListStore from '../store.js'

    // -------------- store data -------------- //
    let groceryList = []
    groceryListStore.subscribe((data) => { // keeps track of updates to the store, sends data to "grocery list which can then be looped through/displayed"
        groceryList = data
    })
    // -------------- store data end -------------- //


    // -------------- modal -------------- //
    let modal
    let selectedRecipe = {} // holds whatever recipe the user selects - used in recipe modal

    function displayRecipe(recipe) { //updates recipe when user clicks on title of recipe in card
        selectedRecipe = recipe;
    }
    // -------------- modal end -------------- //

    let message = false

    // -------------- Adding to store -------------- //

    function addRecipeIngredients(item) {   // adds all the ingredients of a recipet to the store
        console.log(item.name)
        $groceryListStore = [...$groceryListStore, item.ingredients]
    }

    function addIndividualIngredient(item, i) { // adds individual ingredient object to grocery store array
        console.log(item.ingredients[i])
        let groceryItem = {
            "ingredients": [
                {
                    "name": item.ingredients[i].name,
                    "unit": item.ingredients[i].unit,
                    "quantity": item.ingredients[i].quantity,
                    "type": item.ingredients[i].type,
                    "onList": true
                },
            ]
        }
        $groceryListStore = [...$groceryListStore, groceryItem]
        message = true;
    }
    // -------------- adding to store end -------------- //
    function checkArray(arr, name){ // checks for object value within an array
        const found = arr.some(n => n.name == name);
        if (found) {
            return true;
        } else {
            return false;
        }
    }

    function checkGroceryList(list, name) { // loops through array of objects, checks each ingredient object array for value
        list.forEach(function (arrayItem) {
            console.log(checkArray(arrayItem.ingredients, name))
            checkArray(arrayItem.ingredients, name)
        })
    }

    // testing out if certain ingredients are already in the grocery list saved in the store
    checkGroceryList(groceryList, 'test ingredient 1')
    checkGroceryList(groceryList, 'test')


</script>
<!-- looping through data in the store-->
<h4>Ingredients found in store:</h4>
{#each groceryList as grocery}
    {#each grocery.ingredients as ingredient, i}
    <p>{ingredient.name}</p>
    {/each}
{/each}

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
                <tr class="table-fade" on:click={() => addIndividualIngredient(selectedRecipe, i)}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity} {ingredient.unit}</td>
                  {#if checkGroceryList(groceryList, `${ingredient.name}`)}
                    <td>yes</td>
                    {:else}
                     <td>no</td>
                    {/if}
                </tr>
                {/each}
              </table>

              {#if message}
              <p>added item</p>
              {/if}

            <div>
                <h5>Instructions</h5>
                {#each selectedRecipe.instructions as instruction, i}
                    <p><b>step</b> {i+1}: {instruction}</p>
                {/each}
            </div>
        </div>
    </div>
</Modal>

<div class="card-container">
    {#each recipeData as recipe}
        {#if recipe.favorite}
            <div class="recipe-card">
                <img class="recipe-card-img" src="{recipe.image}" alt="anything">
                <div class="recipe-card-info">
                    <h5 on:click={displayRecipe(recipe), modal.show()}>{recipe.name}</h5>
                    <!-- <div class="icon" on:click={() => onFavoriteClick(recipe)}>
                        <IoMdHeart />
                    </div> -->
                </div>
            </div>
        {/if}
    {/each}
</div>


<style>  

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
        /* justify-content: space-evenly; */
    }

    /* .icon {
        width: 32px;
        height: 32px;
        cursor: pointer;
    } */

    /* ----------- CARD STYLING ------------ */

</style>