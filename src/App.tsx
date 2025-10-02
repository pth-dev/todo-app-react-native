import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Todo, TodoStatus } from '@models/index';
import { useTodo } from '@hooks/index';
import { TodoItem, TodoForm, TodoFilterComponent } from '@components/index';
import { COLORS } from '@constants/index';

/**
 * Main application component
 */
function App(): React.JSX.Element {
  const {
    filteredTodos,
    isLoading,
    error,
    filter,
    setFilter,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodo();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleToggleComplete = async (todo: Todo) => {
    const newStatus = todo.status === TodoStatus.ACTIVE ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    await updateTodo(todo.id, { status: newStatus });
  };

  const handleDelete = (todo: Todo) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTodo(todo.id) },
    ]);
  };

  const handleTodoPress = (todo: Todo) => {
    Alert.alert(
      todo.title,
      todo.description || 'No description',
      [{ text: 'OK' }],
      { cancelable: true }
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No todos yet</Text>
      <Text style={styles.emptySubtext}>Tap the + button to create one</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Todos</Text>
        <Text style={styles.headerSubtitle}>{filteredTodos.length} items</Text>
      </View>

      <TodoFilterComponent filter={filter} onFilterChange={setFilter} />

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onPress={handleTodoPress}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setIsFormVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <TodoForm
        isVisible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSubmit={createTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: COLORS.danger,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: '300',
  },
});

export default App;

