export enum TodoProgress { "todo", "in-progress", "completed" }

export interface Todo{
    id: number;
    title: string;
    progress: TodoProgress;
    subtasks: TSubTask[];
    created_at: Date;
    updated_at: Date;
    completed_at?: Date;
    archived_at?: Date;
    meta?: any;
}

export type TSubTask =  {
    'id': number;
    'body' : string;
    'is_task' : boolean;
    'subtasks'? : TSubTask[];
}