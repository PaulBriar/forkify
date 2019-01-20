// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

import controlSearch from '../js/controllers/controlSearch';
import controlRecipe from '../js/controllers/controlRecipe';
import controlList from '../js/controllers/controlList';
