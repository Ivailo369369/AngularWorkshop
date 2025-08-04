import { HttpErrorResponse } from "@angular/common/http";
import { Theme } from "../../../models";
import { createReducer, on } from "@ngrx/store";
import { loadThemes, loadThemesFailure, loadThemesReset, loadThemesSuccess } from "./theme.actions";

export interface ThemeState {
    themes: Theme[];
    loading: boolean;
    error: HttpErrorResponse | null;
}

export const initialState: ThemeState = {
    themes: [],
    loading: false,
    error: null
};

export const themeReducer = createReducer(
    initialState,
    on(loadThemes, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadThemesSuccess, (state, { themes }) => ({
        ...state,
        themes: themes,
        loading: false
    })),
    on(loadThemesFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false
    })),
    on(loadThemesReset, state => ({
        ...state,
        themes: [],
        loading: true,
        error: null       
    }))
);
