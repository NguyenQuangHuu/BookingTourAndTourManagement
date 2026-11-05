import { ToDoItem } from './models';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

interface FilterCondition {
  querySearch: string;
  filterState: 'all' | 'pending' | 'cancel' | 'done';
  sortBy: 'id' | 'title' | 'date';
}

interface TaskState {
  items: ToDoItem[];
  isLoading: boolean;
  message: string;
  error: string | null;
  filterCondition: FilterCondition;
}

const initValue: TaskState = {
  error: null, isLoading: false, items: [], message: '', filterCondition: {
    querySearch: '', filterState: 'all', sortBy: 'id'
  }
};

export const TasksStore = signalStore(
  withState(initValue),
  withComputed((store) => ({
    totalCount: computed(() => store.items().length),
    pendingTasks: computed(() => store.items().filter(item => item.state === 'pending').length),
    doneTasks: computed(() => store.items().filter(item => item.state === 'done').length),
    cancelTasks: computed(() => store.items().filter(item => item.state === 'cancel').length),
    listFilter: computed(() => {
      const { querySearch, filterState } = store.filterCondition;
      return store.items().filter((item) => {
        const matchQuery = item.title.toLowerCase().includes(querySearch().toLowerCase());
        const matchState = filterState() === 'all' || item.state === filterState();
        return matchQuery && matchState;
      });
    })
  })),
  withMethods((store) => ({
    addTask(title: string, description: string) {
      const todoItem: ToDoItem = { id: title + '-' + Date.now(), title: title, description, state: 'pending' };
      patchState((store), (items) => ({ items: [...items.items, todoItem] }));
    },
    cancelTask(id: string) {
      patchState((store), (items) => ({
        items: items.items.map(item => item.id === id ? {
          ...item,
          state: 'cancel'
        } : item)
      }));
    },
    doneTask(id: string) {
      patchState((store), (items) => ({
        items: items.items.map(item => item.id === id ? { ...item, state: 'done' } : item)
      }));
    },
    restoreTask(id: string) {
      patchState((store), (items) => ({
        items: items.items.map(item => item.id === id ? {
          ...item,
          state: 'pending'
        } : item)
      }));
    },
    setQuerySearch(query: string) {
      patchState(store, ({ filterCondition }) => ({
        filterCondition: { ...filterCondition, querySearch: query }
      }));
    },
    setStatus(status: 'all' | 'pending' | 'cancel' | 'done') {
      patchState((store), ({ filterCondition }) => ({
        filterCondition: { ...filterCondition, filterState: status }
      }));
    },
    setSortBy(sortBy: 'id' | 'title' | 'date') {
      patchState(store, ({ filterCondition }) => ({
        filterCondition: { ...filterCondition, sortBy: sortBy }
      }));
    },
    loadTask() {
      patchState(store, { isLoading: true });
      const todos: ToDoItem[] = [
        {
          id: '0001',
          title: 'Đánh răng',
          description: 'đánh răng buổi sáng',
          state: 'done'
        }, {
          id: '0002',
          title: 'Thay đồ',
          description: 'Thay quần áo sơ mi',
          state: 'pending'
        }, {
          id: '0003',
          title: 'Ăn sáng',
          description: 'ăn bún bò',
          state: 'cancel'
        }];
      setTimeout(() => patchState(store, { isLoading: false }), 1000);
      patchState((store), (currentState) => ({
        ...currentState,
        items: [...todos]
      }));
    }

  })),
  withHooks({
      onInit(store) {
        store.loadTask();
      }
    }
  ));
