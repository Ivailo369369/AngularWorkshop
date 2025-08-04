import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Post, Theme } from '../../../models';
import { ThemeItem } from "../theme-item/theme-item";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PostItem } from "../../posts";
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store';
import { selectPosts } from '../../../core/store/posts/post.selectors';
import { selectThemes } from '../../../core/store/themes/theme.selector';
import { loadThemes, loadThemesReset } from '../../../core/store/themes/theme.actions';
import { loadPosts, loadPostsReset } from '../../../core/store/posts/post.actions';

@Component({
  selector: 'app-theme-board',
  imports: [CommonModule, RouterLink, ThemeItem, PostItem],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard implements OnDestroy {
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  themes$: Observable<Theme[]>;
  posts$: Observable<Post[]>;

  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select(selectPosts);
    this.themes$ = this.store.select(selectThemes);
   
    this.store.dispatch(loadThemes());
    this.store.dispatch(loadPosts());
  }

  ngOnDestroy(): void {
    this.store.dispatch(loadThemesReset());
    this.store.dispatch(loadPostsReset());
  }
}
