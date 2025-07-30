import { Injectable, signal } from "@angular/core";
import { ApiUser, User } from "../../models";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        if(savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<ApiUser>(`${this.apiUrl}/login`, { email, password }, {
            withCredentials: true
        }).pipe(
            map(apiUser => this.mapApiUserToUser(apiUser)),
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    register(
        username: string, 
        email: string, 
        phone: string, 
        password: string, 
        rePassword: string): Observable<User> {
        return this.httpClient.post<ApiUser>(`${this.apiUrl}/register`, {
            username,
            email,
            tel: phone,
            password,
            rePassword
        }, {
            withCredentials: true
        }).pipe(
            map(apiUser => this.mapApiUserToUser(apiUser)),
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    logout(): Observable<void> {
        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
            })
        );
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?.id || null;
    }

    update(user: User): Observable<User> {
        return this.httpClient.put<ApiUser>(`${this.apiUrl}/users/${user.id}`, {
            _id: user.id,
            username: user.username,
            email: user.email,
            tel: user.phone       
        }, {
            withCredentials: true
        }).pipe(
            map(apiUser => this.mapApiUserToUser(apiUser)),
            tap(user => {
                this._currentUser.set(user);
                localStorage.setItem('currentUser', JSON.stringify(user))
            })
        );
    }

    getToken(): string {
        return "FAKE_TOKEN=12132";
    }

    private mapApiUserToUser(apiUser: ApiUser): User {
        return <User> {
            id: apiUser._id,
            username: apiUser.username,
            email: apiUser.email,
            phone: apiUser.tel
        };
    }
}
