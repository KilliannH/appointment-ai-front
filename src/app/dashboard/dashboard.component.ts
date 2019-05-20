import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {Appointment} from '../models/Appointment';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-appointments',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'date', 'sent'];
  datasource: MatTableDataSource<Appointment>;
  appointments: Array<Appointment>;

  constructor(private dataservice: DataService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    return this.dataservice.getAppointments().subscribe((res) => {
      if (res.appointments) {
        this.appointments = res.appointments;

        for (let i = 0; i < this.appointments.length; i++) {
          const date = this.appointments[i].date * 1000;
          this.appointments[i].date = new Date(date);
        }

        this.datasource = new MatTableDataSource<Appointment>(this.appointments);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      } else {
        this.snackbar.open(res.status, 'Error', {
          duration: 2000
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
