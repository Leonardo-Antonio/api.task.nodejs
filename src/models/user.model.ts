export interface UserModel {
    id?: number;
    name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}