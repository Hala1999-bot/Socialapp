import { CommentService } from './../s-comment/services/comment.service';
import { DatePipe } from '@angular/common';
import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Post, CommentModel } from './models/post.interface';
import { SCommentComponent } from '../s-comment/s-comment.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-s-post',
  imports: [DatePipe, SCommentComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './s-post.component.html',
  styleUrl: './s-post.component.css',
})
export class SPostComponent implements OnInit {
  post: InputSignal<Post> = input.required();
  commentControl: FormControl = new FormControl(null, [Validators.required]);
  private readonly commentService = inject(CommentService);
  commentsPosts: WritableSignal<CommentModel[]> = signal([]);

  ngOnInit(): void {
    // this.commentsPosts.set(this.post().comments);
    this.commentsPosts.set(this.post()?.comments ?? []);
  }
  submitForm(e: Event): void {
    e.preventDefault();
    if (this.commentControl.valid) {
      //call api
      let data = {
        content: this.commentControl.value,
        post: this.post().id,
      };
      this.commentService.createComments(data).subscribe({
        next: (res) => {
          console.log(res);
          this.commentsPosts.set(res.comments.reverse());

          this.commentControl.reset();
        },
      });
    }
  }
}
