export type TodoType = "todo" | "in-progress" | "completed";

export interface Todo{
    id: Number;
    title: String;
    status: TodoType;
    created_at: Date;
    updated_at: Date;
    completed_at: Date;
}