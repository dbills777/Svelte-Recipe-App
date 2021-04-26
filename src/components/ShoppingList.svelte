<script>
  import { Container } from "sveltestrap";
  import recipeData from "../json/recipes.json";
  import _ from "lodash";
  // console.log("recipeData--->", recipeData);

  export let recipeIngredients = [];

  // _.forEach(recipeData, function (value) {
  //   console.log("value ingredients--", value.ingredients);
  //   const isFavorite = _.get(value, "favorite");

  //   if (isFavorite) {
  //     console.log("this is a favorite", value);

  //     _.forEach(value.ingredients, function (i) {

  //       // console.log("i------", i);
  //       recipeIngredients.push(i);
  //     });
  //     recipeIngredients.sort((a,b) => {
  //       let typeA = a.type.toUpperCase();
  //       let typeB = b.type.toUpperCase();
  //       if (typeA < typeB) {
  //         return -1;
  //       }
  //       if (typeA > typeB) {
  //         return 1;
  //       }
  //       // console.log('type--', typeA, typeB);
  //       return 0;
  //     })
  //     return recipeIngredients;
  //   }
  // });

  //function adds an entire recipe to the grocery list
  function addedRecipe() {
    _.forEach(recipeData, function (value) {
      const isRecipeOnList = _.get(value, "onList");

      if (isRecipeOnList) {
        console.log("this is on the grocery list", value);

        _.forEach(value.ingredients, function (i) {
          recipeIngredients.push(i);
        });

        return recipeIngredients;
      }
    });
  }
  addedRecipe();

  //function adds individual ingredients from a recipe to list

  _.forEach(recipeData, function (recipe) {
    const stuff = _.get(recipe, "ingredients");
    _.forEach(stuff, function (metadata) {
      const isIngredientOnList = _.get(metadata, "onList");
      if (isIngredientOnList) {
        recipeIngredients.push(metadata);
        return recipeIngredients;
      }
    });
  });

  //function to SORT all shopping list items by type, then name

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

  //function to delete all exact duplicates
  recipeIngredients = _.uniqWith(recipeIngredients, _.isEqual);
  console.log("removed duplicates", _.uniqWith(recipeIngredients, _.isEqual));

  //function to combine multiples of the same item
  // function isEquivalent(a, b) {
  //   // Create arrays of property names
  //   var aProps = Object.getOwnPropertyNames(a);
  //   var bProps = Object.getOwnPropertyNames(b);
  //
  //   // If number of properties is different,
  //   // objects are not equivalent
  //   if (aProps.length != bProps.length) {
  //     return false;
  //   }
  //
  //   for (var i = 0; i < aProps.length; i++) {
  //     var propName = aProps[i];
  //
  //     // If values of same property are not equal,
  //     // objects are not equivalent
  //     if (a[propName] !== b[propName]) {
  //       return false;
  //     }
  //   }
  //
  //   // If we made it this far, objects
  //   // are considered equivalent
  //   return true;
  // }

  function addAmountsOfDuplicates(arr) { //need to put objects with same name in their own arrays together.
    const duplicateIngredients = findDuplicateNames(recipeIngredients);
    console.log('array---', arr);
    console.log('dupes--', duplicateIngredients);
    let arrayOne = [];
    let arrayTwo = [];
    _.forEach(arr, (i) => {
      arrayOne.push(i.name);
    });


    _.forEach(duplicateIngredients, (i) => {
      console.log('i--', i);

      if (i === arr.name) {
        console.log('arr name', arr.name);
      }

      console.log(arr[i]);
      arrayTwo.push(arr[i]);
      console.log('----', arrayTwo[i]);
    });
    console.log('array2', arrayTwo);

  }

  function findDuplicateNames(arr) {
    let ingredientNames = [];
    _.forEach(arr, (i) => {
      ingredientNames.push(i.name);
    });
    const reducedArr = _.reduce(ingredientNames, (res, value, key) => {
        (res[value] || (res[value] = [])).push(key);
        return res;
      }, {}
    );
    let duplicateNamesIndex = [];
    _.forEach(reducedArr, (i) => {
      if (_.nth(i, 1)) {
        duplicateNamesIndex.push(i[0], i[1]);
      }
    });

    let duplicateNames = [];
    _.forEach(duplicateNamesIndex, (i) => {
      duplicateNames.push(ingredientNames[i]);
    });
    return duplicateNames;
  }
addAmountsOfDuplicates(recipeIngredients)
  // findDuplicateNames(recipeIngredients);
  // console.log("duplicate ingredients---->", findDuplicateNames(recipeIngredients));

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
    console.log("clicked to remove", item);
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