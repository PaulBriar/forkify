import List from "../models/List";
import {state} from "./appState";
import * as listView from "../views/listView";
import { elements } from "../views/base";


export const controlList = () => {
    //Create new list of none exists and UI
    if(!state.list) state.list = new List();
    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};
//Handle delete and update list item events
elements.shopping.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;
    //Handle the delete button
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);
        //Delete from UI
        listView.deleteItem(id);
    //Handle list item count update
    } else if (event.target.matches('.shopping__count-value')) {
        const value = parseFloat(event.target.value);
        state.list.updateCount(id, value);
    }
});