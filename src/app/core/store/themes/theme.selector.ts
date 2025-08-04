import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ThemeState } from "./theme.reducer";

export const selectThemeState = createFeatureSelector<ThemeState>('themes');

export const selectThemes = createSelector(
    selectThemeState,
    (state: ThemeState) => state.themes
);

export const selectThemesLoading = createSelector(
    selectThemeState,
    (state: ThemeState) => state.loading
);

export const selectThemesError = createSelector(
    selectThemeState,
    (state: ThemeState) => state.error
);
