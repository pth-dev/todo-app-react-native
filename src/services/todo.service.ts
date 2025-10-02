import { Todo, CreateTodoInput, UpdateTodoInput, TodoStatus, TodoFilter } from '@models/index';
import { generateId } from '@utils/index';
import { StorageService } from './storage.service';

/**
 * Service for managing TODO operations
 */
export class TodoService {
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  /**
   * Creates a new TODO item
   */
  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const now = new Date();
    const newTodo: Todo = {
      id: generateId(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: TodoStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };
    const todos = await this.loadAllTodos();
    const updatedTodos = [...todos, newTodo];
    await this.storageService.saveData(updatedTodos);
    return newTodo;
  }

  /**
   * Updates an existing TODO item
   */
  async updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todos = await this.loadAllTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    const existingTodo = todos[todoIndex];
    const updatedTodo: Todo = {
      ...existingTodo,
      ...input,
      updatedAt: new Date(),
      completedAt:
        input.status === TodoStatus.COMPLETED && !existingTodo.completedAt
          ? new Date()
          : existingTodo.completedAt,
    };
    todos[todoIndex] = updatedTodo;
    await this.storageService.saveData(todos);
    return updatedTodo;
  }

  /**
   * Deletes a TODO item
   */
  async deleteTodo(id: string): Promise<void> {
    const todos = await this.loadAllTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    await this.storageService.saveData(filteredTodos);
  }

  /**
   * Retrieves all TODO items
   */
  async loadAllTodos(): Promise<Todo[]> {
    const data = await this.storageService.loadData<Todo[]>();
    if (!data) {
      return [];
    }
    return data.map((todo) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
      completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
    }));
  }

  /**
   * Filters TODO items based on criteria
   */
  filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
    return todos.filter((todo) => {
      const matchesStatus = !filter.status || todo.status === filter.status;
      const matchesPriority = !filter.priority || todo.priority === filter.priority;
      const matchesSearch =
        !filter.searchText ||
        todo.title.toLowerCase().includes(filter.searchText.toLowerCase()) ||
        todo.description.toLowerCase().includes(filter.searchText.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }

  /**
   * Clears all TODO items
   */
  async clearAllTodos(): Promise<void> {
    await this.storageService.clearData();
  }
}

