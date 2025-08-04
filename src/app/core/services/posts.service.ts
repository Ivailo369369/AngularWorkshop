import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../models";

@Injectable({
    providedIn: 'root' 
})
export class PostsService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private httpClient: HttpClient) {}

    getPosts(limit: number = 5): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`${this.apiUrl}/posts?limit={0}`.replace('{0}', limit.toString()));
    }

    createPost(themeName: string, postText: string): Observable<Post> {
        return this.httpClient.post<Post>(`${this.apiUrl}/posts`, { themeName, postText }, {
            withCredentials: true,
        });
    }
}
