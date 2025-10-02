# Contributing to Todo App

Thank you for your interest in contributing to the Todo App! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`

## Code Standards

### TypeScript Guidelines

- Always declare types explicitly
- Avoid using `any` type
- Use interfaces for object shapes
- Use enums for fixed sets of values
- Follow the existing code patterns

### Naming Conventions

- **Files**: kebab-case (e.g., `todo-service.ts`)
- **Classes**: PascalCase (e.g., `TodoService`)
- **Functions/Variables**: camelCase (e.g., `createTodo`)
- **Constants**: UPPERCASE (e.g., `STORAGE_KEY`)
- **Interfaces**: PascalCase (e.g., `Todo`)

### Code Organization

- One export per file
- Group related functionality in modules
- Keep functions small (< 20 lines)
- Use meaningful variable names
- Add JSDoc comments for public APIs

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Production hotfixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(todo): add priority filter to todo list

Add ability to filter todos by priority level.
Users can now select high, medium, or low priority.

Closes #123
```

```
fix(storage): handle JSON parse errors

Add error handling for corrupted storage data.
Prevents app crash when storage is corrupted.
```

### Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `npm test`
4. Run linter: `npm run lint:fix`
5. Format code: `npm run format`
6. Update README.md if needed
7. Create a Pull Request with a clear description

### Pull Request Template

```markdown
## Description
[Describe the changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Tests

- Follow Arrange-Act-Assert pattern
- Use descriptive test names
- Test edge cases
- Mock external dependencies

Example:
```typescript
describe('TodoService', () => {
  it('should create a new todo with correct properties', async () => {
    // Arrange
    const input: CreateTodoInput = {
      title: 'Test Todo',
      description: 'Test Description',
      priority: TodoPriority.HIGH,
    };

    // Act
    const result = await todoService.createTodo(input);

    // Assert
    expect(result.title).toBe(input.title);
    expect(result.status).toBe(TodoStatus.ACTIVE);
  });
});
```

## Code Review Guidelines

### For Authors

- Keep PRs small and focused
- Provide context in PR description
- Respond to feedback promptly
- Update PR based on feedback

### For Reviewers

- Be respectful and constructive
- Focus on code quality and standards
- Check for potential bugs
- Verify tests are adequate
- Suggest improvements

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release branch: `release/v1.x.x`
4. Test thoroughly
5. Merge to main
6. Tag release: `git tag v1.x.x`
7. Push tags: `git push --tags`

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the code
- Improvement suggestions

Thank you for contributing! 🎉

