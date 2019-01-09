// Global app controller
import Search from './models/Search';

//Global state of app
const state = {};

const controlSearch = async () => {
    //Get query from view
    const query = 'pizza';

    if (query) {
        //New search obj, add to state
        state.search = new Search(query);
        //Prepare UI for results

        //Search for receipes
        await state.search.getResults();
        //Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
})

