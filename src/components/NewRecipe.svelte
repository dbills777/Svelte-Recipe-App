<script>
  import { Container } from 'sveltestrap';
  import _ from "lodash";
  import recipeStore from '../RecipeStore'

  let name= '';
  let ingredientName= '';
  let ingredientQuantity=''
  let instructionsArray = [];
  let ingredientsArray = [];
  let ingredients = []
  let imageURL = '';
  let rating = '';
  let selected;
  let currentRecipe = ''
  let answer = ''


    // -------------- store data -------------- //
    let recipeList = []
    recipeStore.subscribe((data) => {
        recipeList = data
    })
    // -------------- store data end -------------- //


  const addItem = () => {
    let instructions = instructionsArray.split(",")
      recipeList.push(
        {
          id: Math.floor(Math.random() * (500 - 100) + 100),
          name,
          rating,
          instructions,
          ingredients: [],
          image: 'https://picsum.photos/200/300',
        }
      )
    name = "";
    rating = ""
        $recipeStore = [ ...recipeList]

  };
    const addIngredient = () => {
    ingredientsArray.push(
      {
      name: ingredientName,
      quantity: ingredientQuantity,
      done: false,
    },
    )
    console.log(ingredientsArray)

    console.log(selected.id)
    const findRecipe = recipeList.filter((recipe)=>{
      return recipe.id ==selected.id
    })
    findRecipe[0].ingredients.push({
      name: ingredientName,
      quantity: ingredientQuantity,
      unit: 'units',
      type: 'type',
      onList: false,
    },)
    console.log(findRecipe[0].ingredients)
    currentRecipe = findRecipe[0].ingredients
     ingredientName = "";
    ingredientQuantity = "";
  };
  let recipeIngredients = [];

  _.forEach(recipeList, function (value) {
    console.log("value ingredients--", value.ingredients);
    const isFavorite = _.get(value, "favorite");

    if (isFavorite) {
      console.log("this is a favorite", value);

      _.forEach(value.ingredients, function (i) {

        recipeIngredients.push(i);
      });
      recipeIngredients.sort((a,b) => {
        let typeA = a.type.toUpperCase();
        let typeB = b.type.toUpperCase();
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
        return 0;
      })
      return recipeIngredients;
    }
  });

  let items = [
    ...recipeIngredients,
    { id: 1, name: "Apples", quantity: 2, done: false },
    { id: 2, name: "Bananas", quantity: 4, done: true },
    { id: 3, name: "Eggs", quantity: 4, done: false },
    { id: 4, name: "Bread", quantity: 1, done: false },
  ];


  const remove = (item) => {
    items = items.filter((i) => i !== item);
    console.log("clicked to remove", item);
  };
  console.log(selected)

</script>

<Container>
  <div>
    <h1>Add A New Recipe</h1>
    <form on:submit|preventDefault={addItem}>
      <label for="name">Enter Recipe Name</label>
      <div class="recipe">
        <input id="name"
        type="text"
        placeholder="New Recipe Name"
        bind:value={name} />
        <input
        id="image"
        type="text"
        placeholder="Enter Image URL"
        bind:value={imageURL} />
        <textarea
        class= "textarea"
        id="instructions"
        type="text"
        placeholder="Enter Instructions Here"
        bind:value={instructionsArray} />

        <input
          id="rating"
          type="number"
          placeholder="Enter Rating 1-10"
          bind:value={rating}
        />
      <button on:submit|preventDefault={addItem}>Add Recipe </button>

    </div>
  </form>
    <form on:submit|preventDefault={addIngredient}>
    <h5>Select a Recipe to add ingredients to it</h5>
    <select bind:value={selected} on:blur="{() => answer = ''}">
      {#each recipeList as ingredient}
      <option value={ingredient}>
				{ingredient.name}
      </option>
      {/each}
    </select>
    <label for="name">Add an ingredient</label>
    <div class="inputs">
      <input
      id="ingredientNamename"
      type="text"
      placeholder="name"
      bind:value={ingredientName} />
      <input
      id="quantity"
      type="number"
      placeholder="quantity"
      bind:value={ingredientQuantity}
      />
    </div>
    <button on:submit|preventDefault={addIngredient}>Add ingredient</button>
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
  .textarea{
    height:200px;
  }
  .inputs {
    display: grid;
    grid-template-columns: 2fr 1fr;
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