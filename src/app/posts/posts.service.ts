import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

const POSTS_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{ posts: Post[], postsCount: number }>();

    constructor(public http: HttpClient, public router: Router) { }

    getPosts(postPerPage: number, page: number) {
        const queryParams = `?pagesize=${postPerPage}&page=${page}`;

        this.http.get<{ message: string, posts: any, maxPosts: number }>(`${POSTS_URL}${queryParams}`)
            .pipe(
                map((postData) => {
                    return {
                        posts: postData.posts.map(post => {
                            return {
                                title: post.title,
                                content: post.content,
                                id: post._id,
                                imagePath: post.imagePath,
                                creator: post.creator
                            };
                        }),
                        maxPosts: postData.maxPosts
                    }
                })
            )
            .subscribe(fixedPostsData => {
                this.posts = fixedPostsData.posts;
                this.postsUpdated.next({
                    posts: [...this.posts],
                    postsCount: fixedPostsData.maxPosts
                });
            })
    }

    getPostsUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string }>(`${POSTS_URL}${id}`)
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);

        this.http.post<{ message: string, post: Post }>(POSTS_URL, postData)
            .subscribe(responseData => {
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: Post | FormData;

        if (typeof (image) === 'object') {
            postData = new FormData();
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
        } else {
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
                creator: null
            };
        }

        this.http.put(`${POSTS_URL}${id}`, postData)
            .subscribe(response => {
                this.router.navigate(['/']);
            });

    }

    deletePost(postId: string) {
        return this.http.delete(`${POSTS_URL}${postId}`)
    }

}