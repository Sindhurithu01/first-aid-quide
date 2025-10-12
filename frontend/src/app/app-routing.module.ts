import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'view-topics',
    loadComponent: () =>
      import('./view-topics/view-topics.component').then(m => m.TopicsComponent)
  },
  {
    path: 'topic-detail/:id',
    loadComponent: () =>
      import('./topic-detail/topic-detail.component').then(m => m.TopicDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
