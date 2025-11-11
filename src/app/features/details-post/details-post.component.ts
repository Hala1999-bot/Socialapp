import { PostService } from './../../shared/components/s-post/services/post.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../shared/components/s-post/models/post.interface';
import { SPostComponent } from '../../shared/components/s-post/s-post.component';

@Component({
  selector: 'app-details-post',
  imports: [SPostComponent],
  templateUrl: './details-post.component.html',
  styleUrl: './details-post.component.css',
})
export class DetailsPostComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  idPost: WritableSignal<string | null> = signal('null');
  post: WritableSignal<Post> = signal({} as Post);
  ngOnInit(): void {
    this.getPostId();
    this.getDetailsPost();
  }
  getPostId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.idPost.set(urlParams.get('id'));
      },
    });
  }
  getDetailsPost(): void {
    this.postService.getSinglePosts(this.idPost()).subscribe({
      next: (res) => {
        console.log(res);
        this.post.set(res.post);
      },
    });
  }
}
