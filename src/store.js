import { writable } from 'svelte/store'

const groceryListStore = writable([
    // initializing store with test data
    {
        "ingredients": [
            {
                "name": "store ingredient 1",
                "unit": "cup",
                "quantity": 3,
                "type": "condiments",
                "onList": false
            },
            {
                "name": "store ingredient 2",
                "unit": "tbsp",
                "quantity": 3,
                "type": "condiments",
                "onList": false
            },
            {
                "name": "store ingredient 3",
                "unit": "tbsp",
                "quantity": 3,
                "type": "condiments",
                "onList": false
            }
        ]

    }
])

export default groceryListStore