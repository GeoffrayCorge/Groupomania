import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { ModifyPostComponent } from '../singlePost/modify-post/modify-post.component';


@Component({
  selector: 'app-singlePost',
  templateUrl: './singlePost.component.html',
  styleUrls: ['./singlePost.component.scss']
})

export class SinglePostComponent implements OnInit {
  @Input() post: Post = new Post();
  user: any = {};
  loggedUserRole: any;
  loggedUserId: any;
  result = 0
  date = ''
  time = ''

  constructor(private auth: AuthService,
    private postService: PostsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.post);

    this.loggedUserId = sessionStorage.getItem('userId');
    this.loggedUserRole = sessionStorage.getItem('role');

    let timestamp = this.post.dateSave
    this.date = new Date(timestamp).toLocaleDateString('fr')
    this.time = new Date(timestamp).toLocaleTimeString('fr')

    this.auth.getUser(this.post.userId).subscribe((data) => {
      this.user = data;
      console.log(this.user);


    })
  }

  delete() {
    this.postService.deletePost(this.post._id).subscribe(data => {
      window.location.reload()
    })
  }

  showComments() {
    this.result++
  }


  openDialog() {
    console.log(this.post._id);
    const postId = JSON.stringify(this.post._id)
    JSON.stringify(sessionStorage.setItem('aaa', postId))
    this.dialog.open(ModifyPostComponent);

  }

  onlike() {
    // if(this.post.usersLiked.includes(this.loggedUserId)) {
    //   const index= this.post.usersLiked.indexOf(this.loggedUserId)    
    //   this.post.usersLiked.splice(index, 1)
    //   return        
    // }
    this.post.usersLiked.push(this.loggedUserId)
    console.log(this.post._id);
    console.log(this.post.usersLiked);

    this.postService.likePost(this.post._id, this.post.usersLiked).subscribe(data => {
      console.log(data);
      console.log(this.post.usersLiked);

    })
  }

  onDislike() {
    const index = this.post.usersLiked.indexOf(this.loggedUserId)
    this.post.usersLiked.splice(index, 1)
    console.log(this.post._id);
    console.log(this.post.usersLiked);

    this.postService.disLikePost(this.post._id, this.post.usersLiked).subscribe(data => {
      console.log(data);
      console.log(this.post.usersLiked);

    })
  }



}





