// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

//Global state of app
const state = {};

//Search Controller
//Setup async api call
const controlSearch = async () => {
    //Collect value from search bar
    const query = searchView.getInput();

    if (query) {
        //New search obj, add to state
        state.search = new Search(query);
        //Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //Search for receipes
        await state.search.getResults();
        //Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    };
};
//Prevent URL parameter search and begin async api call
elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});
//Control pagination click event
elements.searchResPages.addEventListener('click', event => {
    const button = event.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

//Recipe Controller
const rec = new Recipe(47025)
rec.getRecipe();
//console.log(rec);


