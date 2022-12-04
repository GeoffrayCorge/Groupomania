import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { SocialNetworkComponent } from './socialNetwork/socialNetwork.component';
import { ProfilComponent } from './socialNetwork/profil/profil.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './socialNetwork/posts/posts.component';
import { NewPostComponent } from './socialNetwork/newPost/newPost.component';
import { CommentsComponent } from './socialNetwork/singlePost/comments/comments.component';
import { NewCommentComponent } from './socialNetwork/singlePost/new-comment/new-comment.component';
import { SinglePostComponent } from './socialNetwork/singlePost/singlePost.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './services/authGuard.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModifyPostComponent } from './socialNetwork/singlePost/modify-post/modify-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    LoginComponent,
    SignupComponent,
    SocialNetworkComponent,
    ProfilComponent,
    HeaderComponent,
    PostsComponent,
    NewPostComponent,
    SinglePostComponent,
    CommentsComponent,
    NewCommentComponent,
    ModifyPostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule
        ],

  providers: [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
