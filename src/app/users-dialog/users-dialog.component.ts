import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/projects';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserApiService } from '../services/user-api.service';
@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
})
export class UsersDialogComponent implements OnInit {
  userForm!: FormGroup;
  actionBtn: string = 'Save';
  editData: User | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private userApi: UserApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getUser(id);
      this.userForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', Validators.required],
      });
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.userForm.controls['fullName'].setValue(this.editData.fullName);
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['email'].setValue(this.editData.email);
    }
  }

  getUser(id: string) {
    this.userApi.getUserById(id).subscribe({
      next: (userData) => {
        this.editData = userData;
        this.setFormValue(this.editData);
      },
    });
  }
  setFormValue(data: User) {
    if (data) {
      this.actionBtn = 'Update';
      this.userForm.setValue({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
      });
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.userForm.valid) {
        this.userApi.postProduct(this.userForm.value).subscribe({
          next: (res) => {
            alert('product had been added');
            this.userForm.reset();
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
  updateProduct() {
    this.userApi.putProduct(this.editData!.id, this.userForm.value).subscribe({
      next: (res) => {
        alert('product updated');
        this.userForm.reset();
      },
      error: () => {
        alert('product NOT updated');
      },
    });
  }
}
