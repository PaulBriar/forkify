import Likes from "../models/Likes";

export const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    //User has not yet liked current recipe
    if(!state.likes.isLiked(currentID)) {
        //Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //Toggle like button

        //Add like to UI list
        console.log(state.likes);

    //User has liked current recipe
    } else {
        //remove like to state
        state.likes.deleteLike(currentID);
        //Toggle like button

        //remove like to UI list
    }
}