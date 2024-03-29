import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from "../post.models";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  panelOpenState = false;
  posts:Post[] = [];
  private postsSub: Subscription;

    constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
    .subscribe((posts:Post[])=>{
      this.posts = posts;
    })
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
