import { Injectable } from '@angular/core';
import { Post } from './post.models';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class PostsService {
   private posts: Post[] = [];
   private postsUpdated = new Subject<Post[]>();

   constructor(private hhtp: HttpClient) { }


   getPosts(){
    this.hhtp.get<{message:string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts;
      this.postsUpdated.next(this.posts);
    });
   }

   getPostsUpdateListener(){
    return this.postsUpdated.asObservable();
   }

   addPost(title: string, content:string){
    const post: Post = {
      id: null,
      title: title,
      content: content
    };
    this.hhtp.post<{message:string}>('http://localhost:3000/api/posts', post)
    .subscribe((responsetData)=>{
      console.log(responsetData.message);
      
    });
    this.posts.push(post);
    this.postsUpdated.next(this.posts);
   }


}
