import uniqid from 'uniqid';
//Shopping list
export default class List {
    constructor() {
        this.items = [];
    }
    //Add new item to shopping list
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        }
        this.items.push(item);
        return item;
    }
    //Delete item from shopping list
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
};