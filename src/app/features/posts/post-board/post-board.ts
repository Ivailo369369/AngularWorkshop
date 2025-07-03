import { Component } from '@angular/core';
import { PostsService } from '../../../core/services';
import { Post } from '../../../models';
import { PostItem } from '../post-item/post-item';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-board',
  imports: [CommonModule, PostItem],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard {
  posts: Post[] = [];
  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getPosts();
  }
}
