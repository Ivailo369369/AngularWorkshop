import { User } from "./user.model";

export interface Theme {
    id: string;
    themeName: string;
    userId: User;
    subscribers: string[];
    created_at: Date;
}
