import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task, User, TaskAssignment } from '../models/projects';
import { TaskApiService } from '../services/task-api.service';
import { UserApiService } from '../services/user-api.service';
import { TaskAssigService } from '../services/task-assig.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskAssigForm!: FormGroup;
  userName: User[] = [];
  actionBtn: string = 'SAVE';
  displayData: Task | null = null;
  userDesc: string | null = null;
  nameUser: string = 'Pick a Dev';
  editData: TaskAssignment | null = null;
  constructor(
    private taskApi: TaskApiService,
    private taskAssigApi: TaskAssigService,
    private userApi: UserApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserName();
    if (this.userDesc) {
      this.getUserById(this.userDesc);
    }
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTask(id);
      this.taskAssigForm = this.formBuilder.group({
        taskId: [id, Validators.required],
        userId: ['', Validators.required],
      });
    });
    if (this.editData) {
      this.actionBtn = 'UPDATE';

      this.taskAssigForm.controls['userId'].setValue(this.editData.userId);
    }
  }
  getTask(id: string) {
    this.taskApi.getTaskById(id).subscribe({
      next: (taskData) => {
        this.displayData = taskData;
      },
    });
  }
  // getTaskAssig(id: string) {
  //   this.taskAssigApi.getTaskAssigById(id).subscribe({
  //     next: (taskData) => {
  //       this.editData = taskData;
  //       this.setFormValue(this.editData);
  //     },
  //   });
  // }
  // setFormValue(data: TaskAssignment) {
  //   if (data) {
  //     this.actionBtn = 'Update';
  //     this.taskAssigForm.setValue({
  //       Userid: data.Userid,
  //     });
  //   }
  // }
  getUserName() {
    this.userApi.getProduct().subscribe((data) => {
      this.userName = data;
    });
  }
  getUserById(id: string) {
    this.userApi.getUserById(id).subscribe((data) => {
      this.nameUser = data.fullName;
    });
  }
  addProduct() {
    if (!this.editData) {
      if (this.taskAssigForm.valid) {
        this.taskAssigApi.postProduct(this.taskAssigForm.value).subscribe({
          next: (res) => {
            alert('assignation success');
            // this.taskAssigForm.reset();
          },
          error: () => {
            alert('error assigning');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    this.taskAssigApi
      .putProduct(this.editData!.id, this.taskAssigForm.value)
      .subscribe({
        next: (res) => {
          alert('Assig updated');
          // this.taskAssigForm.reset();
        },
        error: () => {
          alert('Assig NOT updated');
        },
      });
  }
}
