export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}
