import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/projects';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  title = 'Angular13Crud';

  displayedColumns: string[] = ['fullName', 'userName', 'email', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userApi: UserApiService) {}
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
    this.userApi.getProduct().subscribe({
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
    this.userApi.deleteProduct(id).subscribe({
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
