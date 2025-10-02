import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TodoFilter, TodoStatus, TodoPriority } from '@models/index';
import { COLORS } from '@constants/index';

interface TodoFilterProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

/**
 * Component for filtering TODO items
 */
export function TodoFilterComponent({ filter, onFilterChange }: TodoFilterProps) {
  const handleStatusFilter = (status?: TodoStatus) => {
    onFilterChange({ ...filter, status });
  };

  const handlePriorityFilter = (priority?: TodoPriority) => {
    onFilterChange({ ...filter, priority });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.filterButton, !filter.status && styles.filterButtonActive]}
            onPress={() => handleStatusFilter(undefined)}
          >
            <Text
              style={[styles.filterButtonText, !filter.status && styles.filterButtonTextActive]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter.status === TodoStatus.ACTIVE && styles.filterButtonActive,
            ]}
            onPress={() => handleStatusFilter(TodoStatus.ACTIVE)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter.status === TodoStatus.ACTIVE && styles.filterButtonTextActive,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter.status === TodoStatus.COMPLETED && styles.filterButtonActive,
            ]}
            onPress={() => handleStatusFilter(TodoStatus.COMPLETED)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter.status === TodoStatus.COMPLETED && styles.filterButtonTextActive,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Priority</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.filterButton, !filter.priority && styles.filterButtonActive]}
            onPress={() => handlePriorityFilter(undefined)}
          >
            <Text
              style={[styles.filterButtonText, !filter.priority && styles.filterButtonTextActive]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter.priority === TodoPriority.HIGH && styles.filterButtonActive,
            ]}
            onPress={() => handlePriorityFilter(TodoPriority.HIGH)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter.priority === TodoPriority.HIGH && styles.filterButtonTextActive,
              ]}
            >
              High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter.priority === TodoPriority.MEDIUM && styles.filterButtonActive,
            ]}
            onPress={() => handlePriorityFilter(TodoPriority.MEDIUM)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter.priority === TodoPriority.MEDIUM && styles.filterButtonTextActive,
              ]}
            >
              Medium
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter.priority === TodoPriority.LOW && styles.filterButtonActive,
            ]}
            onPress={() => handlePriorityFilter(TodoPriority.LOW)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter.priority === TodoPriority.LOW && styles.filterButtonTextActive,
              ]}
            >
              Low
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
});

