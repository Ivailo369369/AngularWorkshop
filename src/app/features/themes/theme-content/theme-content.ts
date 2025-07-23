import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services';
import { Comment } from '../../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-content',
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-content.html',
  styleUrls: ['./theme-content.css']
})
export class ThemeContent {
  private route = inject(ActivatedRoute);
  protected authService = inject(AuthService);

  themeTitle = 'Angular 18';
  themeDate = '2024-10-10 12:08:28';
  subscribersCount = 456;
  isSubscribed = false;
  
  newComment = '';
  commentError = false;

  // Mock comments data
  comments: Comment[] = [
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint dolorem quam, accusantium ipsa veniam laudantium inventore aut, tenetur quibusdam doloribus. Incidunt odio nostrum facilis ipsum dolorem deserunt illum?',
      author: 'David',
      date: '2024-10-10 12:08:28',
      likes: 5,
      liked: false,
      disliked: false
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor sit amet consectetur',
      author: 'Mark',
      date: '2024-10-10 14:28:11',
      likes: 3,
      liked: false,
      disliked: false
    }
  ];

  ngOnInit(): void {
    // Get theme ID from route params
    this.route.params.subscribe(params => {
      const themeId = params['themeId'];
      console.log('Theme ID:', themeId);
      // In a real app, you would fetch theme details and comments here
    });
  }

  toggleSubscribe(): void {
    this.isSubscribed = !this.isSubscribed;
    if (this.isSubscribed) {
      this.subscribersCount++;
    } else {
      this.subscribersCount--;
    }
  }

  likeComment(commentId: string): void {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      if (comment.liked) {
        comment.likes--;
        comment.liked = false;
      } else {
        comment.likes++;
        comment.liked = true;
        if (comment.disliked) {
          comment.disliked = false;
        }
      }
    }
  }

  dislikeComment(commentId: string): void {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      if (comment.disliked) {
        comment.disliked = false;
      } else {
        comment.disliked = true;
        if (comment.liked) {
          comment.likes--;
          comment.liked = false;
        }
      }
    }
  }

  isCommentValid(): boolean {
    return this.newComment.trim().length >= 10;
  }

  addComment(): void {
    if (!this.isCommentValid()) {
      this.commentError = true;
      return;
    }

    this.commentError = false;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      text: this.newComment,
      author: this.authService.currentUser()?.username || 'Anonymous',
      date: new Date().toLocaleString(),
      likes: 0,
      liked: false,
      disliked: false
    };

    this.comments.unshift(newComment);
    this.newComment = '';
  }
}
