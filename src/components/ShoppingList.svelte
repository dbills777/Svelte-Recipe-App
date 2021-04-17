<script>
  import { Container } from "sveltestrap";
  import recipeData from "../json/recipes.json";
  import _ from "lodash";
  // console.log("recipeData--->", recipeData);

  let recipeIngredients = [];

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
      // console.log("value ingredients--", value.ingredients);
      const isRecipeOnList = _.get(value, "onList");

      if (isRecipeOnList) {
        console.log("this is on the grocery list", value);

        _.forEach(value.ingredients, function (i) {
          // console.log("i------", i);
          recipeIngredients.push(i);
        });

        return recipeIngredients;
      }
    });
  }
  addedRecipe();

  //function adds individual ingredients from a recipe to list

  _.forEach(recipeData, function (recipe) {
    // console.log('recipeData----->', recipeData);
    // console.log("value --", recipe);
    const stuff = _.get(recipe, "ingredients");
    // console.log('recipeIngredients---', recipeIngredients);
    _.forEach(stuff, function (metadata) {
      // console.log('ingredients metadata----', metadata);
      const isIngredientOnList = _.get(metadata, "onList");
      if (isIngredientOnList) {
        // console.log('metadata that is ON LIST-----', metadata);
        recipeIngredients.push(metadata);
        // console.log('recipeIngredeints--', recipeIngredients);
        return recipeIngredients;
      }
    });
    // console.log('individualIngredients--', individualIngredients);
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

  function findDuplicateNames(arr) {
    let nameArr = [];
    _.forEach(arr, (i) => {
      nameArr.push(i.name);
    });
    const reducedArr = _.reduce(
      nameArr,
      (res, value, key) => {
        (res[value] || (res[value] = [])).push(key);
        return res;
      },
      {}
    );
    console.log('redArr--', reducedArr);

    const stuffs =_.forEach(reducedArr, (i) => {
      if (_.nth(i, 1)) {
        console.log("this is a duplicate--", i);
        // dupe.push(i[0]);
        return i[0];
      }
      return null;
    });

    let duplicates = [];
    _.forEach(stuffs, (i) => {
      console.log("-----sadkjl", nameArr[i]);
      console.log("nnnnn", nameArr[i]);
      duplicates.push(nameArr[i]);
      console.log("duplicates", duplicates);
    });
    return duplicates;
  }

  findDuplicateNames(recipeIngredients);
  console.log(
    "duplicate ingredients---->",
    findDuplicateNames(recipeIngredients)
  );

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
