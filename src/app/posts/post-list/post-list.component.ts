import { Component, Input } from '@angular/core';

import { Post } from "../post.models";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  panelOpenState = false;
  @Input() posts:Post[] = [];


    constructor(public postsService: PostsService) { }
}
