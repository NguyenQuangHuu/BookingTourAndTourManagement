import { ToDoItem } from './models';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

interface TaskState {
  items: ToDoItem[];
  isLoading: boolean;
  message: string;
  error: string;
  filterCondition: 'cancel' | 'pending' | 'done';
}

const initValue: TaskState = {
  error: '', isLoading: false, items: [], message: '', filterCondition: 'pending'
};

export const TasksStore = signalStore(
  withState(initValue),
  withComputed((store) => ({
    totalCount: computed(() => store.items().length),
    pendingTasks: computed(() => store.items().filter(item => item.state === 'pending').length),
    doneTasks: computed(() => store.items().filter(item => item.state === 'done').length),
    cancelTasks: computed(() => store.items().filter(item => item.state === 'cancel').length),
    listFilter: computed(() => store.items().filter(item => item.state === store.filterCondition()))
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
    loadTask() {
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
      patchState((store), (items) => ({
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
