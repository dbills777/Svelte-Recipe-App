<script>
  import { Container } from "sveltestrap";
  import _ from "lodash";
  import groceryListStore from "../store.js";

  export let recipeIngredients = [];
  // -------------- store data -------------- //
  let groceryList = [];
  groceryListStore.subscribe((data) => {
    // keeps track of updates to the store, sends data to "grocery list which can then be looped through/displayed"
    groceryList = data;
  });

  _.map(groceryList, (items) => {
      _.forEach(items, (ingredients) => {
          _.map(ingredients, (i) => {
            const isOnList = _.get(i, 'onList');
            if (isOnList) {
            recipeIngredients.push(i)
            }
          })
      })
  })



  //function adds an entire recipe to the grocery list
  // function addedRecipe() {
  //   _.forEach(recipeData, function (value) {
  //     const isRecipeOnList = _.get(value, "onList");

  //     if (isRecipeOnList) {
  //       _.forEach(value.ingredients, function (i) {
  //         recipeIngredients.push(i);
  //       });

  //       return recipeIngredients;
  //     }
  //   });
  // }
  // addedRecipe();

  //adds individual ingredients from a recipe to list
  _.forEach(recipeIngredients, function (recipe) {
    const stuff = _.get(recipe, "ingredients");
    console.log('stuff--->', stuff);
    _.forEach(stuff, function (metadata) {
      const isIngredientOnList = _.get(metadata, "onList");
      console.log('isIngredientOnList---->', isIngredientOnList);
      if (isIngredientOnList) {
        console.log('this isgredient is true on the list---->', metadata);
        recipeIngredients.push(metadata);
        return recipeIngredients;
      } else {
        return;
      }
    });
  });

  // SORT all shopping list items by type, then name
  recipeIngredients.sort((a, b) => {
    let typeA = a.type.toUpperCase();
    let typeB = b.type.toUpperCase();
    let nameA = a.name.toUpperCase().split(" ")[0];
    let nameB = b.name.toUpperCase().split(" ")[0];

    if (typeA < typeB) {
      return -1;
    } else if (typeA > typeB) {
      return 1;
    }
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  //delete all exact duplicates
  recipeIngredients = _.uniqWith(recipeIngredients, _.isEqual);


  let storeItems;

  let items = [
    ...recipeIngredients,
    // { id: 1, name: "Apples", quantity: 2, type: 'fruit', onList: true, done: false }
    // { id: 2, name: "Bananas", quantity: 4, done: true },
    // { id: 3, name: "Eggs", quantity: 4, done: false },
    // { id: 4, name: "Bread", quantity: 1, done: false },
  ];
  console.log("items------>", items);

  let name = "";
  let quantity = "";
  let unit = "";


  const addItem = () => {

    items = [
      ...items,
      {
        name,
        unit,
        quantity,
        type: '',
        onList: true,
      }
    
    ];

    storeItems = [{
    
      ingredients: [items.slice(-1)[0]]
    }]
    $groceryListStore = [...$groceryListStore, storeItems[0]]


  };

  const remove = (item) => {
    item.onList = false;
    items = items.filter((i) => i !== item);
    // storeItems = storeItems.filter((i) => i.ingredients[0] !== item);
    // _.set(storeItems, 'ingredients.onList', false)
    // $groceryListStore = [...$groceryListStore, storeItems[0]]

  };


</script>

<Container>
  <div>
    <h1>Shopping List</h1>
    <form on:submit|preventDefault={addItem}>

      <label for="name">Add an item</label>
      <div class="inputs">
        <input id="name" type="text" placeholder="name" bind:value={name} />
        <input
          id="quantity"
          type="text"
          placeholder="quantity"
          bind:value={quantity}
        />
        <input
        id="unit"
        type="text"
        placeholder="unit"
        bind:value={unit}
      />

      <select name="type" id="type">
        <option value="please select">Select type</option>
        <option value="canned goods">Canned Goods</option>
        <option value="condiments">Condiments</option>
        <option value="dairy">Dairy</option>
        <option value="meat">Meat</option>
        <option value="produce">Produce</option>
        <option value="spices">Spices</option>

      </select> 
      </div>
      <button on:submit|preventDefault={addItem}>Add </button>
    </form>

    <ul>
      {#each items as item}
      <p>{item.type}</p>
        <li class:done={item.done}>
          <div class="item-name">
            <input type="checkbox" bind:checked={item.done} />
            <span>{item.name}</span>
          </div>
          <div class="item-details">
            {#if item.quantity}
              <span id="quantity">{item.quantity}</span>
            {/if}
            {#if item.unit}
              <span id="unit">{item.unit}</span>
            {/if}
            <span id="remove" on:click={() => remove(item)}>&times;</span>
          </div>
        </li>

      {/each}




    </ul>
  </div>
</Container>

<style>
  form div.inputs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  li {
    list-style: none;
    display: flex;
    width: 50%;
    justify-content: space-between;
  }
  li #remove {
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
    color: rgb(165, 165, 165);
  }
  .done span {
    opacity: 0.4;
  }
</style>
