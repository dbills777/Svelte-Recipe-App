<script>
      let items = [
    { id: 1, name: "Apples", quantity: 2, done: false },
    { id: 2, name: "Bananas", quantity: 4, done: true },
    { id: 3, name: "Eggs", quantity: 4, done: false },
    { id: 4, name: "Bread", quantity: 1, done: false }

  ];
  let name = "";
  let quantity = "";

  const addItem = () => {
    items = [
      ...items,
      {
        id: Math.random(),
        name,
        quantity,
        done: false
      }
    ];
    name = "";
    quantity = "";
  };

  const remove = item => {
    items = items.filter(i => i !== item);
  };

//   const toggle = item => {
//     item.done = !item.done;
//     items = items;
//   };
    // let newItem = '';
    // let quantity = '';
    // let ingredient = '';
    // let shoppingList = [
    //     {
    //         ingredient: 'Apples',
    //         quantity: {
    //             unit: null,
    //             amount: .5
    //         },
    //         status: false
    //     },
    //     {
    //         ingredient: 'Peanut Butter',
    //         quantity: {
    //             unit: 'oz',
    //             amount: 3
    //         },
    //         status: false
    //     }
    // ];
//     const toggle = item => {
//     item.status = !item.status;
//     items = items;
//   };

//     function addToList() {
//         shoppingList = [...shoppingList, {ingredient: newItem, quantity, status: false}];
//         newItem = '';
//     }

//     function removeFromList(item) {
//         shoppingList.splice(index, 1)
//         shoppingList = shoppingList

//     }
</script>

<!-- <input bind:value={newItem} type='text' placeholder='add another ingredient'>
<button on:click={addToList}>Add</button>
<br/> -->
<div>
    <h1>Shopping List</h1>
  
    <form on:submit|preventDefault={addItem}>
      <label for="name">Add an item</label>
      <div class="inputs">
      <input id="name" type="text" placeholder="name" bind:value={name} />
      <input id="quantity" type="text" placeholder="quantity" bind:value={quantity} />
    </div>
      <button on:submit|preventDefault={addItem}
      >Add </button>

    </form>
  
    <ul>
      {#each items as item}
        <li class:done={item.done}>
            <input type="checkbox" bind:checked={item.done} />
            <span>{item.name}</span>
  
    
          <span id="quantity">{item.quantity}</span>

          <span id="remove" on:click={() => remove(item)}>&times;</span>
        </li>
      {/each}
    </ul>
  </div>





<style>
form div.inputs{
    /* color: red; */
    display: grid;
    grid-template-columns: 2fr 1fr;
}

li {
    list-style: none;
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* justify-content: space-between; */
}
li #remove{
    /* float: right; */
    justify-items: flex-end;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    color: #dc4f21;
    font-size: 18px;
    cursor: pointer;
  }
  li #quantity {
      color:rgb(165, 165, 165);
  }
.done span {
    opacity: 0.4;
  }

</style>