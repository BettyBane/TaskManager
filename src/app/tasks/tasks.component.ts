import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../models/projects';
import { TaskApiService } from '../services/task-api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  title = 'Angular13Crud';

  displayedColumns: string[] = [
    'taskCategoryId',
    'projectId',
    'title',
    'startDate',
    'duration',
    'statusId',
    'action',
  ];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskApi: TaskApiService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  // openDialog() {
  //   const dialogRef = this.dialog
  //     .open(TasksDialogComponent, { width: '30%' })
  //     .afterClosed()
  //     .subscribe((val) => {
  //       if (val === 'save') {
  //         this.getAllProducts();
  //       }
  //     });
  // }
  getAllProducts() {
    this.taskApi.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // editProduct(row: any) {
  //   this.dialog
  //     .open(DialogComponent, {
  //       width: '30%',
  //       data: row,
  //     })
  //     .afterClosed()
  //     .subscribe((val) => {
  //       if (val === 'update') {
  //         this.getAllProducts();
  //       }
  //     });
  // }
  deleteProduct(id: string) {
    this.taskApi.deleteProduct(id).subscribe({
      next: (res) => {
        alert('deleted!!');
        this.getAllProducts();
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
