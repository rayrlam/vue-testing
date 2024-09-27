export type TodoType = "todo" | "in-progress" | "completed";

export interface Todo{
    id: string;
    title: string;
    status: TodoType;
    created_at: Date;
    updated_at: Date;
    completed_at: Date;
}