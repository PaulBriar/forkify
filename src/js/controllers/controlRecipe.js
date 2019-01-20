import Recipe from '../models/Recipe';
import List from '../models/List';
import * as recipeView from '../views/recipeView';
import * as searchView from '../views/searchView';
import {state} from './appState';
import { elements, clearLoader, renderLoader } from '../views/base';
import {controlList} from '../controllers/controlList';
import {controlLike} from '../controllers/controlLike';

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
        //Decrease button is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        //Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //Add ingredients to shopping list
        controlList();
    }else if (event.target.matches('.recipe__love, .recipe__love *')) {
        //Like controller
        controlLike();
    }

});

window.l = new List();