import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models';
import { TimeAgoPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-post-item',
  imports: [TimeAgoPipe],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostItem {
  @Input() post!: Post;
  @Output() postChangedEvent = new EventEmitter<Post>();
}
