import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput, TodoFilter } from '@models/index';
import { TodoService } from '@services/todo.service';
import { StorageService } from '@services/storage.service';

const storageService = new StorageService();
const todoService = new TodoService(storageService);

interface UseTodoResult {
  todos: Todo[];
  filteredTodos: Todo[];
  isLoading: boolean;
  error: string | null;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
  createTodo: (input: CreateTodoInput) => Promise<void>;
  updateTodo: (id: string, input: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

/**
 * Custom hook for managing TODO operations
 */
export function useTodo(): UseTodoResult {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TodoFilter>({});

  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedTodos = await todoService.loadAllTodos();
      setTodos(loadedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (input: CreateTodoInput): Promise<void> => {
    try {
      setError(null);
      await todoService.createTodo(input);
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    }
  }, [loadTodos]);

  const updateTodo = useCallback(async (id: string, input: UpdateTodoInput): Promise<void> => {
    try {
      setError(null);
      await todoService.updateTodo(id, input);
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  }, [loadTodos]);

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  }, [loadTodos]);

  const refreshTodos = useCallback(async (): Promise<void> => {
    await loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    const filtered = todoService.filterTodos(todos, filter);
    setFilteredTodos(filtered);
  }, [todos, filter]);

  return {
    todos,
    filteredTodos,
    isLoading,
    error,
    filter,
    setFilter,
    createTodo,
    updateTodo,
    deleteTodo,
    refreshTodos,
  };
}

