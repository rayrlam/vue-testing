export type TodoType = "todo" | "in-progress" | "completed";

export interface Todo{
    id: number;
    title: string;
    status: TodoType;
    created_at: Date;
    updated_at: Date;
    completed_at?: Date;
    archived_at?: Date;
    meta?: any;
}