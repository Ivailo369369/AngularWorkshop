import { createAction, props } from "@ngrx/store";
import { Post } from "../../../models";
import { HttpErrorResponse } from "@angular/common/http";

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
    '[Posts] Load Posts Success',
    props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
    '[Posts] Load Posts Failure',
    props<{ error: HttpErrorResponse | null }>()
);
export const loadPostsReset = createAction('[Posts] Load Posts Reset');
