import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { SinglePostComponent } from '../singlePost.component';



@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  @Input() post: Post = new Post();
  file: any = undefined

  constructor(private postService: PostsService,
              private postId: SinglePostComponent
              
  ) { }

  ngOnInit() {
      
    this.postService.getPosts().subscribe((response) => {
      // this.post = response;
      // console.log(this.post);
      this.post= response
      console.log(this.post);
     })
     this.postService.getOnePost(this.post._id).subscribe((response) => {
      console.log(this.post._id);
      
     })

     
  }

  addFile(event: any){
    this.file = event.target.files[0]
    console.log(this.file);
  }

  send(credentials: any) {
    const body = new FormData();
    body.append('text', credentials.text)
    body.append('file', this.file)

    // for(const post of this.post) {
    //   console.log(post._id); 
    //   if (post.id === this.post._id) {
    //     console.log(post._id); 

    //   }

    // }
    
       
    // this.postService.updatePost(postId, body).subscribe(response => {
    //   window.location.reload()
    // })
  }






}
