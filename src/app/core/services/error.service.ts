import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private _error = signal<string | null>(null);

    public error = this._error.asReadonly();

    setError(message: string) {
        this._error.set(message);
        setTimeout(() => this._error.set(null), 5000);
    }
}