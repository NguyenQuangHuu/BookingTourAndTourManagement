import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Task, TaskStatus } from './task.model';


interface FilterCondition {
  querySearch: string;
  filterStatus: 'ALL' | TaskStatus;
  sortBy: 'id' | 'title' | 'createdAt';
}

interface TaskState {
  data: Task[];
  isLoading: boolean;
  message: string | null;
  error: string | null;
  filterCondition: FilterCondition;
}

const initValue: TaskState = {
  error: null, isLoading: false, data: [], message: null, filterCondition: {
    querySearch: '', filterStatus: 'ALL', sortBy: 'id'
  }
};

export const TaskStore = signalStore(
  withState(initValue),
  withComputed((store) => ({
    totalCount: computed(() => store.data().length),
    inProgressTasks: computed(() => store.data().filter(item => item.taskStatus === 'IN_PROGRESS').length),
    doneTasks: computed(() => store.data().filter(item => item.taskStatus === 'DONE').length),
    todoTasks: computed(() => store.data().filter(item => item.taskStatus === 'TODO').length),
    listFilter: computed(() => {
      const { querySearch, filterStatus } = store.filterCondition;
      return store.data().filter((item) => {
        const matchQuery = item.title.toLowerCase().includes(querySearch().toLowerCase());
        const matchState = filterStatus() === 'ALL' || item.taskStatus === filterStatus();
        return matchQuery && matchState;
      });
    })
  })),
  withMethods((store) => ({
    addTask(title: string, description?: string, dueDate?: string) {
      const createdAt = new Date(Date.now()).toString();
      const task: Task = {
        id: createdAt,
        title: title,
        description,
        taskStatus: 'TODO',
        taskPriority: 'LOW',
        dueDate,
        createdAt
      };
      patchState((store), (state) => {
        return { ...state, data: [...state.data, task] };
      });
    },
    todoTask(id: string) {
      patchState(store, (state) => {
        return { ...state, data: state.data.map(item => item.id === id ? { ...item, taskStatus: 'TODO' } : item) };
      });
    },
    doneTask(id: string) {
      patchState((store), (state) => (
        { ...state, data: state.data.map(item => item.id === id ? { ...item, taskStatus: 'DONE' } : item) }
      ));
    },
    restoreTask(id: string) {
      patchState((store), (state) => ({
        ...state, data: state.data.map((task) => {
          if (task.id === id) {
            return { ...task, taskStatus: 'IN_PROGRESS' };
          }
          return task;
        })
      }));
    },
    setQuerySearch(query: string) {
      patchState(store, ({ filterCondition }) => ({
        filterCondition: { ...filterCondition, querySearch: query }
      }));
    },
    setStatus(status: 'ALL' | TaskStatus) {
      patchState((store), (state) => ({
        ...state, filterCondition: { ...state.filterCondition, filterStatus: status }
      }));
    },
    setSortBy(sortBy: 'id' | 'title' | 'createdAt') {
      patchState(store, (state) => ({
        ...state, filterCondition: { ...state.filterCondition, sortBy: sortBy }
      }));
    },
    loadTask() {
      patchState(store, { isLoading: true });
      const tasks: Task[] = [
        {
          id: '0001',
          title: 'Đánh răng',
          description: 'đánh răng buổi sáng',
          taskStatus: 'TODO',
          taskPriority: 'LOW',
          dueDate: '',
          createdAt: ''
        }, {
          id: '0002',
          title: 'Thay đồ',
          description: 'Thay quần áo sơ mi',
          taskStatus: 'IN_PROGRESS',
          taskPriority: 'HIGH',
          dueDate: '',
          createdAt: ''
        }, {
          id: '0003',
          title: 'Ăn sáng',
          description: 'ăn bún bò',
          taskStatus: 'DONE',
          taskPriority: 'MEDIUM',
          dueDate: '',
          createdAt: ''
        }];
      // setTimeout(() => patchState(store, { isLoading: false }), 1000);
      patchState(store, { isLoading: false });
      patchState((store), (currentState) => ({
        ...currentState,
        data: [...tasks]
      }));
    }

  })),
  withHooks({
      onInit(store) {
        store.loadTask();
      }
    }
  ));
