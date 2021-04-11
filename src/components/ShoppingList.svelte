<script>
  import { Col, Container, Row } from "sveltestrap";
  import recipeData from "../json/recipes.json";
  import _ from "lodash";
  console.log("recipeData--->", recipeData);

  let recipeIngredients = [];

  _.forEach(recipeData, function (value) {
    console.log("value ingredients--", value.ingredients);
    const isFavorite = _.get(value, "favorite");

    if (isFavorite) {
      console.log("this is a favorite", value);
      _.forEach(value.ingredients, function (i) {
        const stuff = value.ingredients
        i.sort( function (i) {
          return i.type
        })
        console.log('stuff--', stuff);

        console.log("i------!!", i);
        recipeIngredients.push(i);
        // recipeIngredients.sort( function (a) {
        //   return a.type
        // })
        console.log('type--', recipeIngredients.type);
      });
      return recipeIngredients;
    }
  });
  console.log("recipes----", recipeIngredients);

  let items = [
    ...recipeIngredients,
    { id: 1, name: "Apples", quantity: 2, done: false },
    { id: 2, name: "Bananas", quantity: 4, done: true },
    { id: 3, name: "Eggs", quantity: 4, done: false },
    { id: 4, name: "Bread", quantity: 1, done: false },
  ];
  console.log("items------>", items);

  let name = "";
  let quantity = "";

  const addItem = () => {
    items = [
      ...items,
      {
        id: Math.random(),
        name,
        quantity,
        done: false,
      },
    ];
    name = "";
    quantity = "";
  };

  const remove = (item) => {
    items = items.filter((i) => i !== item);

    // if (item.type) {
    //   console.log('items again--', items);
    //   console.log('this items has a type', item);
    //   let itemToRemove = _.find(items, ['ingredients.name', 'item.name'])
    //   console.log('itemToRemove', itemToRemove);
    // }
    console.log("clicked to remove", item);
  };
</script>

<Container>
  <Row>
    <Col>
      .col
      <h1>Shoppingssadf List</h1>
    </Col>
  </Row>

  <div>
    <h1>Shoppingssadf List</h1>
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
      </div>
      <button on:submit|preventDefault={addItem}>Add </button>
    </form>

    <ul>
      {#each items as item}
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
    /* color: red; */
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  li {
    list-style: none;
    display: flex;
    width: 50%;
    
    
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    justify-content: space-between;
  }
  li #remove {
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
    color: rgb(165, 165, 165);
  }
  .done span {
    opacity: 0.4;
  }
</style>
