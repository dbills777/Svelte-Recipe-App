<script>
  import { Form, FormGroup, FormText, Input, Label, Container } from 'sveltestrap';
  import _ from "lodash";
  import recipeData from "../json/recipes.json";
  let newRecipeData = {};
  let recipeName= '';
  let newIngredients = '';
  let instructions = '';
  let imageURL = '';
  let rating = '';
  let recipeIngredients = [];
  let allRecipes = [...recipeData]
  console.log(allRecipes)

    _.forEach(recipeData, function (value) {
    // console.log("value ingredients--", value.ingredients);
    const isFavorite = _.get(value, "favorite");

    if (isFavorite) {
      // console.log("this is a favorite", value);

      _.forEach(value.ingredients, function (i) {

        // console.log("i------", i);
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
        // console.log('type--', typeA, typeB);
        return 0;
      })
      return recipeIngredients;
    }
  });
  let items = [
    ...allRecipes,
    {
    id: 55, name: 'Some New Recipe',
    mage: 'https://picsum.photos/200/300',
    rating: 5,
    instructions: 'some instructions'
  }

  ];

  const addItem = () => {
      items = [
      ...items,
      {
        id: Math.floor(Math.random() * (500 - 100) + 100),
        recipeName,
        rating,
        instructions,
      },

    ];
    recipeName = ""
    rating = ""
    instructions=""

    console.log(items)
  };
</script>

<Container>
  <div>
    <h1>Add A New Recipe</h1>
    <form on:submit|preventDefault={addItem}>
      <label for="name">Enter Recipe Name</label>
      <div class="inputs">
        <input id="name"
        type="text"
        placeholder="New Recipe Name"
        bind:value={recipeName} />
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
        bind:value={instructions} />
        <input
          id="rating"
          type="number"
          placeholder="Enter Rating 1-10"
          bind:value={rating}
        />
      </div>
      <button on:submit|preventDefault={addItem}>Add </button>
    </form>
  </div>
</Container>
{#if recipeName}
  <p>Recipe Name: {recipeName}</p>
{/if}

<style>
  .textarea{
    height:200px;
  }
</style>