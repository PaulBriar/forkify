// Global app controller
import axios from 'axios';

async function getResults(query) {
    const key = 'fb1d52c867654a2b1708d52be8f5b554';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try{
        const res = await axios(
            `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
        );
        const recipes = res.data.recipes[0];
        console.log(recipes);
    } catch (err) {
        alert(err);;
    };
};
getResults('pizza');
