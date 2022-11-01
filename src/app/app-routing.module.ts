import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDialogComponent } from './tasks-dialog/tasks-dialog.component';
import { UsersComponent } from './users/users.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/edittask', component: TasksDialogComponent },
  { path: 'tasks/edittask/:id', component: TasksDialogComponent },
  { path: 'tasks/details/:id', component: TaskDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/edituser', component: UsersDialogComponent },
  { path: 'users/edituser/:id', component: UsersDialogComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
