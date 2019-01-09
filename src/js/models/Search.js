import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = 'fb1d52c867654a2b1708d52be8f5b554';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try{
            const res = await axios(
                `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
            );
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (err) {
            alert(err);;
        };
    };

}