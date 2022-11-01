import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectType, Status } from '../models/projects';
import { ProjectTypeService } from '../services/project-type.service';
import { StatusTypeService } from '../services/status-type.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  projectForm!: FormGroup;
  projectType: ProjectType[] = [];
  statusType: Status[] = [];
  actionBtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private projectTypeApi: ProjectTypeService,
    private statusTypeApi: StatusTypeService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectTypeId: ['', Validators.required],
      code: ['', Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      statusId: ['', Validators.required],
    });
    this.getProjectType();
    this.getStatusType();
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.projectForm.controls['projectTypeId'].setValue(
        this.editData.projectTypeId
      );
      this.projectForm.controls['code'].setValue(this.editData.code);
      this.projectForm.controls['title'].setValue(this.editData.title);
      this.projectForm.controls['startDate'].setValue(this.editData.startDate);
      this.projectForm.controls['endDate'].setValue(this.editData.endDate);
      this.projectForm.controls['statusId'].setValue(this.editData.statusId);
    }
  }

  getProjectType() {
    this.projectTypeApi.getProduct().subscribe((data) => {
      this.projectType = data;
    });
  }
  getStatusType() {
    this.statusTypeApi.getProduct().subscribe((data) => {
      this.statusType = data;
    });
  }

  addProduct() {
    if (!this.editData) {
      if (this.projectForm.valid) {
        this.api.postProduct(this.projectForm.value).subscribe({
          next: (res) => {
            alert('product had been added');
            this.projectForm.reset();
            this.dialogRef.close('save');
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
    this.api.putProduct(this.editData.id, this.projectForm.value).subscribe({
      next: (res) => {
        alert('product updated');
        this.projectForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('product NOT updated');
      },
    });
  }
}
