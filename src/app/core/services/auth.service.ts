import { Injectable, signal } from "@angular/core";
import { User } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        {
            id: '5fa64b162183ce1728ff371d', 
            username: 'John', 
            email: 'john.doe@gmail.com',
            phone: '+359 885 888 888'
        },
        {
            id: '5fa64b162183ce1728ff371e', 
            username: 'Jane',
            email: 'john.doe@gmail.com',
            phone: '+359 885 888 888'
        },
        {
            id: '5fa64b162183ce1728ff371f', 
            username: 'David',
            email: 'john.doe@gmail.com',
            phone: '+359 885 888 888'
        }
    ]

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if(savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    login(email: string, password: string): boolean {
        if (email && password) {
           const user = this._users[0];
            this._currentUser.set(user);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(user));

            return true;
        }

        return false;
    }

    register(username: string, email: string, phone: string, password: string, rePassword: string): boolean {
        if(username && email && phone && password && rePassword) {
            const newUser: User = {
                id: `user_${Date.now()}`,
                username: username,
                email: email,
                phone: phone
            };

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            return true;
        }

        return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?.id || null;
    }

    update(user: User): void {
        const userIndex = this._users.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            this._users[userIndex] = user;
        }

        this._currentUser.set(user);

        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}
