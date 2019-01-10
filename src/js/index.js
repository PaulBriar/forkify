// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

//Global state of app
const state = {};

const controlSearch = async () => {
    //Get query from view
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

elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});

