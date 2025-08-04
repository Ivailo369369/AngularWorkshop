import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ThemesService } from "../../services";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadThemes, loadThemesFailure, loadThemesSuccess } from "./theme.actions";

@Injectable()
export class ThemeEffects {
    loadThemes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadThemes),
            mergeMap(() => this.themesService.getThemes()
                .pipe(
                    map(themes => loadThemesSuccess({ themes })),
                    catchError(error => of(loadThemesFailure({ error })))
                ))
        )
    );

    constructor(
        private actions$: Actions,
        private themesService: ThemesService
    ) {}
}