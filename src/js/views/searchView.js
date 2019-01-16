import { elements } from './base';
//Collect search bar input
export const getInput = () => elements.searchInput.value;
//Clear search bar input field
export const clearInput = () => {
    elements.searchInput.value = '';
};
//Clear recipe results before new search
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
//Highlight selected recipe
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};
//Limit recipe title to one line in results
const limitRecipeTitle = (recipe, limit = 17) => {
    const newTitle = [];
    if (recipe.length > limit) {
        recipe.split(' ').reduce((acc, cur) => {
            //Check if length of combined words < 17
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        //Break newTitle array back into sentence
        return `${newTitle.join(' ')} ...`;
    }
    return recipe;
};
//Build recipe search results markup
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    //Add to UI
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};
//Add pagination button to recipe search results
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;
//Add correct pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }
    //Add search results top down plus button
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
//Render recipe search results component
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    //Render pagination
    renderButtons(page, recipes.length, resPerPage);
};