import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo, TodoStatus, TodoPriority } from '@models/index';
import { formatRelativeTime } from '@utils/index';
import { COLORS } from '@constants/index';

interface TodoItemProps {
  todo: Todo;
  onPress: (todo: Todo) => void;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

/**
 * Component for rendering a single TODO item
 */
export function TodoItem({ todo, onPress, onToggleComplete, onDelete }: TodoItemProps) {
  const isCompleted = todo.status === TodoStatus.COMPLETED;
  const priorityColor = getPriorityColor(todo.priority);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(todo)} activeOpacity={0.7}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
          onPress={() => onToggleComplete(todo)}
        >
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={1}>
              {todo.title}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
              <Text style={styles.priorityText}>{todo.priority.toUpperCase()}</Text>
            </View>
          </View>

          {todo.description ? (
            <Text style={styles.description} numberOfLines={2}>
              {todo.description}
            </Text>
          ) : null}

          <Text style={styles.timestamp}>{formatRelativeTime(todo.updatedAt)}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(todo)}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function getPriorityColor(priority: TodoPriority): string {
  switch (priority) {
    case TodoPriority.HIGH:
      return COLORS.priorityHigh;
    case TodoPriority.MEDIUM:
      return COLORS.priorityMedium;
    case TodoPriority.LOW:
      return COLORS.priorityLow;
    default:
      return COLORS.textSecondary;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 20,
    color: COLORS.danger,
    fontWeight: 'bold',
  },
});

