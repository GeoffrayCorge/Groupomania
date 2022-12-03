import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { NewPostComponent } from './socialNetwork/newPost/newPost.component';
import { PostsComponent } from './socialNetwork/posts/posts.component';
import { SinglePostComponent } from './socialNetwork/singlePost/singlePost.component';
import { CommentsComponent } from './socialNetwork/singlePost/comments/comments.component';
import { NewCommentComponent } from './socialNetwork/singlePost/new-comment/new-comment.component';
import { AuthGuard } from './services/authGuard.service';
import { ProfilComponent } from './socialNetwork/profil/profil.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]  },
  { path: 'post/:id', component: SinglePostComponent, canActivate: [AuthGuard]  },
  { path: 'newPost', component: NewPostComponent, canActivate: [AuthGuard]  },
  { path: 'modifyPost/:id', component: NewPostComponent, canActivate: [AuthGuard]  },
  { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard]  },
  { path: 'newComment', component: NewCommentComponent, canActivate: [AuthGuard]  },
  { path: 'modifyComment/:id', component: NewCommentComponent, canActivate: [AuthGuard]  },
  { path: 'profil', component: ProfilComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
