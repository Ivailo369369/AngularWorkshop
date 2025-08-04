import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.reducer";

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
    selectPostState,
    (state: PostState) => state.posts
);

export const selectPostsLoading = createSelector(
    selectPostState,
    (state: PostState) => state.loading   
);

export const selectPostsError = createSelector(
    selectPostState,
    (state: PostState) => state.error   
);
