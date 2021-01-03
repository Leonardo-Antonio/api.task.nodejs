export interface TaskModel {
    id?: number;
    title: string;
    body: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}