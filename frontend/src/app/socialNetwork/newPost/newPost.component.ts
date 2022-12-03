import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-newPost',
  templateUrl: './newPost.component.html',
  styleUrls: ['./newPost.component.scss']
})
export class NewPostComponent implements OnInit {
  @Input() post: Post = new Post();
  loggedUser: any;
  file: any = undefined

  constructor(private postService: PostsService,
              private auth: AuthService)
               { }

  ngOnInit() {
    this.loggedUser = sessionStorage.getItem('userId');
    this.auth.getUser(this.loggedUser).subscribe((data) => {
      this.loggedUser = data;
      
  })
}

  send(credentials: any) {
    const body = new FormData();
    body.append('text', credentials.text)
    body.append('file', this.file)
    this.postService.send(body).subscribe(response => {
      window.location.reload()
    })
  }

  addFile(event: any){
    this.file = event.target.files[0]
    console.log(this.file);
    
  }

}


