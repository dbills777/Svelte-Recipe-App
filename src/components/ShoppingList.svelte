<script>
  import recipeData from '../json/recipes.json';
  import _ from 'lodash';
  console.log('recipeData--->', recipeData);

  // let data = _.forEach(recipeData, 'ingredients', 'red');
  // const isFavorite = _.get(recipeData, 'favorite')
  // data.ingredients.map((ingredient) => {
  //   return { ingredient, done: false };
  // })
  let recipes = [];
  let theStuff;

  const data = _.forEach(recipeData, function(value) {
    console.log('value ingredients--', value.ingredients);
    const isFavorite = _.get(value, 'favorite');

    if (isFavorite) {
      const map = _.map(value, 'ingredients')
      console.log('mapped----', map);
      console.log('this is a favorite', value);
      theStuff = value.ingredients
      console.log('the stuff', theStuff);
      recipes.push(theStuff)
      return recipes
      
    }
    return;
  });
  console.log('recipes----', recipes);

      let items = [
        ...theStuff, 
    { id: 1, name: "Apples", quantity: 2, done: false },
    { id: 2, name: "Bananas", quantity: 4, done: true },
    { id: 3, name: "Eggs", quantity: 4, done: false },
    { id: 4, name: "Bread", quantity: 1, done: false }

  ];
  console.log('items------>', items);

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
    items = items.filter((i) => i !== item)

    if (item.type) {
      console.log('items again--', items);
      console.log('this items has a type', item);
      let itemToRemove = _.find(items, ['ingredients.name', 'item.name'])
      console.log('itemToRemove', itemToRemove);
    }
    console.log('clicked to remove', item);
  };

</script>

<div>
    <h1>Shoppingssadf List <h1>
  
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
      {#each recipeData as recipe}
      <li>{recipe.name}</li>
        {#each recipe.ingredients as ingredients}
        <li class:done={ingredients.done}>
        <input type="checkbox" bind:checked={ingredients.done} />
          <span>{ingredients.name}</span>
          <span id="quantity">{ingredients.quantity}</span>

          <span id="remove" on:click={() => remove(ingredients)}>&times;</span>
        </li>

      {/each}
      {/each}

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