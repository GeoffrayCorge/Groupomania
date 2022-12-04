import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { SinglePostComponent } from '../singlePost.component';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {
  @Input() post: Post = new Post();
  inputText: string = "";
  user: any = {};



  constructor( private postService : PostsService,
                private onePost : SinglePostComponent ) { }

  ngOnInit() {   

  }

  sendComment() {    
    this.post.comments.push()

    console.log(this.inputText);
    const getPost = this.onePost.post
    this.postService.addComment(getPost._id, this.inputText).subscribe(data => {
      console.log(data);
      
    }
      )
  }

}
