import Likes from "../models/Likes";
import * as likesView from '../views/likesView';

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
            likesView.toggleLikeBtn(true);
        //Add like to UI list
        likesView.renderLike(newLike);

    //User has liked current recipe
    } else {
        //remove like to state
        state.likes.deleteLike(currentID);
        //Toggle like button
        likesView.toggleLikeBtn(false);
        //remove like to UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
