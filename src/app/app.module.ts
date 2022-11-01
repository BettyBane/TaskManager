import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDialogComponent } from './tasks-dialog/tasks-dialog.component';
import { ProjectsComponent } from './projects/projects.component';
import { HeaderComponent } from './shared/header/header.component';
import { UsersComponent } from './users/users.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { EditButtonComponent } from './shared/edit-button/edit-button.component';
import { DeleteButtonComponent } from './shared/delete-button/delete-button.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { MatListModule } from '@angular/material/list';
import { DetailsButtonComponent } from './shared/details-button/details-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TasksComponent,
    TasksDialogComponent,
    ProjectsComponent,
    HeaderComponent,
    UsersComponent,
    UsersDialogComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    TaskDetailsComponent,
    DetailsButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
