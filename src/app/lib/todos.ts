export interface Todo {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoRequest {
  description: string;
  completed: boolean;
}

export interface UpdateTodoRequest {
  description: string;
  completed: boolean;
}

const TODO_API_BASE_URL = process.env.NEXT_PUBLIC_TODO_API_URL || 'https://93v1r.wiremockapi.cloud';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${TODO_API_BASE_URL}/v1/todos`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
}

export async function createTodo(todo: CreateTodoRequest): Promise<Todo> {
  const response = await fetch(`${TODO_API_BASE_URL}/v1/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
}

export async function updateTodo(id: string, todo: UpdateTodoRequest): Promise<Todo> {
  const response = await fetch(`${TODO_API_BASE_URL}/v1/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${TODO_API_BASE_URL}/v1/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
} 