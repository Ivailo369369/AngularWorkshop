import { ActionReducerMap } from '@ngrx/store';
import * as fromPosts from './posts/post.reducer';
import * as fromThemes from './themes/theme.reducer';

export interface AppState {
    themes: fromThemes.ThemeState;
    posts: fromPosts.PostState;
}

export const reducers: ActionReducerMap<AppState> = {
    themes: fromThemes.themeReducer,
    posts: fromPosts.postReducer
}
