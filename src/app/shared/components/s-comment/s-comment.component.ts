import { Component, input, signal, InputSignal } from '@angular/core';
import { CommentModel } from '../s-post/models/post.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-s-comment',
  imports: [DatePipe],
  templateUrl: './s-comment.component.html',
  styleUrl: './s-comment.component.css',
})
export class SCommentComponent {
  comment: InputSignal<CommentModel> = input.required();
}
