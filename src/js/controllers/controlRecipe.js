import Recipe from '../models/Recipe';

import {state} from './appState';

//Recipe Controller
export const controlRecipe = async () => {
    //Get id from URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        //Prepare UI for changes

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data & parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert(`Error processing recipe data!`);
        };
    };
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
