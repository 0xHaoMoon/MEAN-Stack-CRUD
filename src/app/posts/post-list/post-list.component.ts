import { Component, OnInit } from '@angular/core';

import { Post } from "../post.models";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  panelOpenState = false;
  posts:Post[] = [];


    constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }
}
