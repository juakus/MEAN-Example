import { AuthService } from './../../auth/auth.service';
import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    isLoading = false;
    userIsAuthenticated = false;
    userId: string;
    totalPost = 0;
    currentPage = 1;
    postPerPage = 2;
    pageSizeOptions = [2, 3, 5, 10];
    private postsSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public postSservice: PostsService, public authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
        this.postSservice.getPosts(this.postPerPage, this.currentPage);
        this.postSservice.getPostsUpdateListener()
            .subscribe((postData: { posts: Post[], postsCount: number }) => {
                this.isLoading = false;
                this.totalPost = postData.postsCount;
                this.posts = postData.posts;
            });

        this.userIsAuthenticated = this.authService.getIsAuth();
        this.userId = this.authService.getUserId();
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            })
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postSservice.deletePost(postId).subscribe(() => {
            this.postSservice.getPosts(this.postPerPage, this.currentPage);
        }, () => {
            this.isLoading = false;
        });
    }

    onChangePage(pageData: PageEvent) {
        this.currentPage = pageData.pageIndex + 1;
        this.postPerPage = pageData.pageSize;
        this.postSservice.getPosts(this.postPerPage, this.currentPage);
    }

    ngOnDestroy() {
        if (!!this.postsSub) this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }
}