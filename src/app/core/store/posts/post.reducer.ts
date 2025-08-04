import { HttpErrorResponse } from "@angular/common/http";
import { Post } from "../../../models";
import { createReducer, on } from "@ngrx/store";
import { loadPosts, loadPostsFailure, loadPostsReset, loadPostsSuccess } from "./post.actions";

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: HttpErrorResponse | null
}

export const initialState: PostState = {
    posts: [],
    loading: false,
    error: null
};

export const postReducer = createReducer(
    initialState,
    on(loadPosts, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadPostsSuccess, (state, { posts }) => ({
        ...state,
        posts: posts,
        loading: false
    })),
    on(loadPostsFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    })),
    on(loadPostsReset, state => ({
        ...state,
        posts: [],
        loading: false,
        error: null
    }))
);
