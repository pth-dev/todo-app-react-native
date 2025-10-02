/**
 * Priority level for a TODO item
 */
export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Status of a TODO item
 */
export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

/**
 * TODO item model
 */
export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly priority: TodoPriority;
  readonly status: TodoStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly completedAt?: Date;
}

/**
 * Data required to create a new TODO
 */
export interface CreateTodoInput {
  readonly title: string;
  readonly description: string;
  readonly priority: TodoPriority;
}

/**
 * Data that can be updated in a TODO
 */
export interface UpdateTodoInput {
  readonly title?: string;
  readonly description?: string;
  readonly priority?: TodoPriority;
  readonly status?: TodoStatus;
}

/**
 * Filter options for TODO list
 */
export interface TodoFilter {
  readonly status?: TodoStatus;
  readonly priority?: TodoPriority;
  readonly searchText?: string;
}

