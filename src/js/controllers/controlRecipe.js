import Recipe from '../models/Recipe';
import * as recipeView from '../views/recipeView';
import * as searchView from '../views/searchView';
import {state} from './appState';
import { elements, clearLoader, renderLoader } from '../views/base';

//Recipe Controller
export const controlRecipe = async () => {
    //Get id from URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //Highlight selected search item
        if (state.search) searchView.highlightSelected(id);
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
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert(`Error processing recipe data!`);
            console.log(err);

        };
    };
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    if(event.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);

});