import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  link = 'http://localhost:3000/api/post/'
  postId : String
  constructor(private http: HttpClient,
    ) { }

  getPosts(): Observable<any> {
    return this.http.get(this.link)
  }

  send(credentials: any) {
    return this.http.post<{ userId: string, token: string }>(this.link , credentials)
  }

  deletePost(postId: String) {
    return this.http.delete(this.link + postId)
  }

  likePost(postId: any, credentials: any) {
    return this.http.post(this.link + postId, credentials)
  }

  disLikePost(postId: any, credentials: any) {
    return this.http.patch(this.link + postId, credentials)
  }

  updatePost(postId: any, credentials: any) {
    return this.http.put<{ userId: string, token: string }>(this.link + postId, credentials)
  }
}
