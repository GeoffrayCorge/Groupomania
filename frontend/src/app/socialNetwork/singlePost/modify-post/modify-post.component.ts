import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';



@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  @Input() post: Post = new Post();
  onePost: any= ''

  constructor(private postService: PostsService,
  ) { }

  ngOnInit() {
      
    this.postService.getPosts().subscribe((response) => {
      this.post = response;
      console.log(this.post);
      this.onePost= response[1]
      console.log(this.onePost.text);
  

     })
     
  }



}
