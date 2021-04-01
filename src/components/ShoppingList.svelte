<script>
    let newItem = '';
    let quantity = '';
    let shoppingList = [
        {
            ingredient: 'Apples',
            quantity: {
                unit: null,
                amount: .5
            },
            status: false
        },
        {
            ingredient: 'Peanut Butter',
            quantity: {
                unit: 'oz',
                amount: 3
            },
            status: false
        }
    ];

    function addToList() {
        shoppingList = [...shoppingList, {ingredient: newItem, quantity, status: false}];
        newItem = '';
    }

    function removeFromList(index) {
        shoppingList.splice(index, 1)
        shoppingList = shoppingList
    }
</script>

<input bind:value={newItem} type='text' placeholder='add another ingredient'>
<button on:click={addToList}>Add</button>
<br/>

{#each shoppingList as item, index}
    <input bind:checked={item.status} type='checkbox'>
    {#if item.status} 
        <span on:click={() => removeFromList(index)
            }></span>
    {:else}
    <span class:checked={item.status} >{item.ingredient}</span>
    <span on:click={() => removeFromList(index)}> X </span>
    {/if}
    <br/>
{/each}




<style>

</style>