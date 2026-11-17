import { Routes } from '@angular/router';
import { LandingPage } from '../pages/landing-page/landing-page';

export const userRoute: Routes = [{
  path: '', component: LandingPage, title: 'Landing page'
}, {
  path: 'login', loadComponent: () => import('../pages/user/user-login/user-login').then(u => u.UserLogin)
}, {
  path: 'chat-bot', loadComponent: () => import('../pages/chat-bot/chat-bot').then(c => c.ChatBot)
}, {
  path: 'task',
  loadComponent: () => import('../features/task/create-task/create-task').then((t) => t.CreateTask),
  title: 'Add Task'
}, {
  path: 'vocabulary',
  loadComponent: () => import('../features/dictionary/list-page/list-page').then((t) => t.ListPage),
  title: 'Vocabulary list page'
}
];
