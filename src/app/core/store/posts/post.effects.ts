import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PostsService } from '../../services';
import { loadPosts, loadPostsSuccess, loadPostsFailure } from './post.actions';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => this.postsService.getPosts()
        .pipe(
          map(posts => loadPostsSuccess({ posts })),
          catchError(error => of(loadPostsFailure({ error })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) {}
}