import { TodoService } from '@services/todo.service';
import { StorageService } from '@services/storage.service';
import { TodoPriority, TodoStatus, CreateTodoInput } from '@models/index';

jest.mock('@services/storage.service');

describe('TodoService', () => {
  let todoService: TodoService;
  let mockStorageService: jest.Mocked<StorageService>;

  beforeEach(() => {
    mockStorageService = new StorageService() as jest.Mocked<StorageService>;
    todoService = new TodoService(mockStorageService);
    jest.clearAllMocks();
  });

  describe('createTodo', () => {
    it('should create a new todo with correct properties', async () => {
      // Arrange
      const inputData: CreateTodoInput = {
        title: 'Test Todo',
        description: 'Test Description',
        priority: TodoPriority.HIGH,
      };
      mockStorageService.loadData.mockResolvedValue([]);
      mockStorageService.saveData.mockResolvedValue();

      // Act
      const actualResult = await todoService.createTodo(inputData);

      // Assert
      expect(actualResult.title).toBe(inputData.title);
      expect(actualResult.description).toBe(inputData.description);
      expect(actualResult.priority).toBe(inputData.priority);
      expect(actualResult.status).toBe(TodoStatus.ACTIVE);
      expect(actualResult.id).toBeDefined();
      expect(actualResult.createdAt).toBeInstanceOf(Date);
      expect(actualResult.updatedAt).toBeInstanceOf(Date);
    });

    it('should save the todo to storage', async () => {
      // Arrange
      const inputData: CreateTodoInput = {
        title: 'Test Todo',
        description: 'Test',
        priority: TodoPriority.MEDIUM,
      };
      mockStorageService.loadData.mockResolvedValue([]);
      mockStorageService.saveData.mockResolvedValue();

      // Act
      await todoService.createTodo(inputData);

      // Assert
      expect(mockStorageService.saveData).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo', () => {
    it('should update todo status to completed', async () => {
      // Arrange
      const mockTodo = {
        id: '1',
        title: 'Test',
        description: 'Test',
        priority: TodoPriority.LOW,
        status: TodoStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockStorageService.loadData.mockResolvedValue([mockTodo]);
      mockStorageService.saveData.mockResolvedValue();

      // Act
      const actualResult = await todoService.updateTodo('1', { status: TodoStatus.COMPLETED });

      // Assert
      expect(actualResult.status).toBe(TodoStatus.COMPLETED);
      expect(actualResult.completedAt).toBeInstanceOf(Date);
    });

    it('should throw error if todo not found', async () => {
      // Arrange
      mockStorageService.loadData.mockResolvedValue([]);

      // Act & Assert
      await expect(todoService.updateTodo('999', { title: 'Updated' })).rejects.toThrow(
        'Todo not found'
      );
    });
  });

  describe('filterTodos', () => {
    it('should filter todos by status', () => {
      // Arrange
      const mockTodos = [
        {
          id: '1',
          title: 'Active Todo',
          description: '',
          priority: TodoPriority.LOW,
          status: TodoStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Completed Todo',
          description: '',
          priority: TodoPriority.LOW,
          status: TodoStatus.COMPLETED,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Act
      const actualResult = todoService.filterTodos(mockTodos, { status: TodoStatus.ACTIVE });

      // Assert
      expect(actualResult).toHaveLength(1);
      expect(actualResult[0].status).toBe(TodoStatus.ACTIVE);
    });

    it('should filter todos by priority', () => {
      // Arrange
      const mockTodos = [
        {
          id: '1',
          title: 'High Priority',
          description: '',
          priority: TodoPriority.HIGH,
          status: TodoStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Low Priority',
          description: '',
          priority: TodoPriority.LOW,
          status: TodoStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Act
      const actualResult = todoService.filterTodos(mockTodos, { priority: TodoPriority.HIGH });

      // Assert
      expect(actualResult).toHaveLength(1);
      expect(actualResult[0].priority).toBe(TodoPriority.HIGH);
    });

    it('should filter todos by search text', () => {
      // Arrange
      const mockTodos = [
        {
          id: '1',
          title: 'Buy groceries',
          description: 'Milk and bread',
          priority: TodoPriority.LOW,
          status: TodoStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Read book',
          description: 'Fiction novel',
          priority: TodoPriority.LOW,
          status: TodoStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Act
      const actualResult = todoService.filterTodos(mockTodos, { searchText: 'groceries' });

      // Assert
      expect(actualResult).toHaveLength(1);
      expect(actualResult[0].title).toContain('groceries');
    });
  });
});

