import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private post: PostsService,
  ) { }

  ngOnInit() {
    this.post.getPosts().subscribe((response) => {  
     return this.posts = response;   
    })
 }
}
