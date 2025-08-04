import { createAction, props } from "@ngrx/store";
import { Theme } from "../../../models";
import { HttpErrorResponse } from "@angular/common/http";

export const loadThemes = createAction('[Themes] Load Themes');
export const loadThemesSuccess = createAction(
    '[Themes] Load Themes Success',
    props<{ themes: Theme[] }>()
);
export const loadThemesFailure = createAction(
    '[Themes] Load Themes Failer',
    props<{ error: HttpErrorResponse | null}>()
);
export const loadThemesReset = createAction('[Themes] Load Themes Reset');
