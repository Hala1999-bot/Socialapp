import { PostService } from './../s-post/services/post.service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { initFlowbite, Modal } from 'flowbite';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  saveFile: WritableSignal<File | string> = signal('');
  content: FormControl = new FormControl(null, [Validators.required]);
  myModal = viewChild<ElementRef>('modal');
  private readonly PostService = inject(PostService);
  ngOnInit(): void {
    initFlowbite();
  }
  changeImage(e: Event): void {
    let input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      this.saveFile.set(input.files[0]);
    }
  }
  submitForm(e: Event): void {
    e.preventDefault();
    if (this.content.valid) {
      console.log(this.content.value);
      console.log(this.saveFile());
    }
    const formData = new FormData();
    formData.append('body', this.content.value);

    if (this.saveFile()) {
      formData.append('image', this.saveFile());
    }
    //send formdata backend
    this.PostService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          //close modal
          new Modal(this.myModal()?.nativeElement).hide();
          this.PostService.getAllPosts();
          //get post
        }
      },
    });
  }
}
