import { Component, inject } from '@angular/core';
import { AuthService, PostsService, ThemesService } from '../../../core/services';
import { Post, Theme } from '../../../models';
import { ThemeItem } from "../theme-item/theme-item";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PostItem } from "../../posts";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-theme-board',
  imports: [CommonModule, RouterLink, ThemeItem, PostItem],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard {
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  themeId: string = '5fa64a9f2183ce1728ff371a';
  themes$: Observable<Theme[]>;
  posts$: Observable<Post[]>;

  constructor(
    private themeService: ThemesService,
    private postsService: PostsService) {
  
    this.themes$ = this.themeService.getThemes();
    this.posts$ = this.postsService.getPosts();
  }
}

