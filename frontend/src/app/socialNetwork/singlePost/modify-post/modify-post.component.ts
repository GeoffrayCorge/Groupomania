import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  @Input() post: Post = new Post();
  file: any = undefined
  postId : any
  constructor(private postService: PostsService              
  ) { }

  ngOnInit() {
      
    this.postService.getPosts().subscribe((response) => {
      this.post= response
      console.log(this.post);
     })
     this.postId = sessionStorage.getItem('aaa')
  }

  addFile(event: any){
    this.file = event.target.files[0]
    console.log(this.file);
  }

  send(credentials: any) {
    const body = new FormData();
    body.append('text', credentials.text)
    body.append('file', this.file)
    const id = JSON.parse(this.postId);

    this.postService.updatePost(id, body).subscribe(response => {
      window.location.reload()
    })
  }
}
