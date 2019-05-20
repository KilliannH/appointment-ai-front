import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {Appointment} from '../models/Appointment';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {

  appointment: Appointment;

  constructor(private dataservice: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.appointment = {id: null, name: null, notes: null, date: null, sent: null, user_id: null};
    return this.route.params.pipe(map(p => p.id)).subscribe((id) => {
      if (id) {
        return this.dataservice.getAppointment(id).subscribe((res) => {
          if (res) {
            return this.appointment = res.appointment;
          }
        });
      }
    });
  }

  delete() {
    return this.dataservice.deleteAppointment(this.appointment.id).subscribe((res) => {
      if (res.message.contains('deleted')) {
        this.router.navigate(['/dashboard']);
        return this.snackbar.open('Appointment deleted successfully', 'Success', { duration: 2000});
      } else {
        return this.snackbar.open('Appointment not found', 'Error', { duration: 2000});
      }
    });
  }

}
