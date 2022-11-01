import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { TaskApiService } from '../services/task-api.service';
import { Project, Status, TaskCategory, Task } from '../models/projects';
import { StatusTypeService } from '../services/status-type.service';
import { TaskTypeService } from '../services/task-type.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.scss'],
})
export class TasksDialogComponent implements OnInit {
  taskForm!: FormGroup;
  statusType: Status[] = [];
  taskType: TaskCategory[] = [];
  projectName: Project[] = [];
  actionBtn: string = 'Save';
  editData: Task | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private taskApi: TaskApiService,
    private api: ApiService,
    private statusTypeApi: StatusTypeService,
    private taskTypeApi: TaskTypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProjectName();
    this.getStatusType();
    this.getTaskType();

    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTask(id);
      this.taskForm = this.formBuilder.group({
        taskCategoryId: ['', Validators.required],
        projectId: ['', Validators.required],
        title: ['', Validators.required],
        startDate: ['', Validators.required],
        duration: ['', Validators.required],
        statusId: ['', Validators.required],
      });
    });
    if (this.editData) {
      this.actionBtn = 'Update';

      this.taskForm.controls['taskCategoryId'].setValue(
        this.editData.taskCategoryId
      );
      this.taskForm.controls['projectId'].setValue(this.editData.projectId);
      this.taskForm.controls['title'].setValue(this.editData.title);
      this.taskForm.controls['startDate'].setValue(this.editData.startDate);
      this.taskForm.controls['duration'].setValue(this.editData.duration);
      this.taskForm.controls['statusId'].setValue(this.editData.statusId);
    }
  }

  getTask(id: string) {
    this.taskApi.getTaskById(id).subscribe({
      next: (taskData) => {
        this.editData = taskData;
        this.setFormValue(this.editData);
      },
    });
  }
  setFormValue(data: Task) {
    if (data) {
      this.actionBtn = 'Update';
      this.taskForm.setValue({
        taskCategoryId: data.taskCategoryId,
        projectId: data.projectId,
        title: data.title,
        startDate: data.startDate,
        duration: data.duration,
        statusId: data.statusId,
      });
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.taskApi.postProduct(this.taskForm.value).subscribe({
          next: (res) => {
            alert('product had been added');
            this.taskForm.reset();
          },
          error: () => {
            alert('error adding product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  getStatusType() {
    this.statusTypeApi.getProduct().subscribe((data) => {
      this.statusType = data;
    });
  }
  getTaskType() {
    this.taskTypeApi.getProduct().subscribe((data) => {
      this.taskType = data;
    });
  }
  getProjectName() {
    this.api.getProduct().subscribe((data) => {
      this.projectName = data;
    });
  }
  updateProduct() {
    this.taskApi.putProduct(this.editData!.id, this.taskForm.value).subscribe({
      next: (res) => {
        alert('product updated');
        this.taskForm.reset();
      },
      error: () => {
        alert('product NOT updated');
      },
    });
  }
}
