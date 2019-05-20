import { Component, OnInit } from '@angular/core';
import {Appointment} from '../models/Appointment';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/User';
import {DataService} from '../services/data.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  newAppointment: Appointment;
  currentUser: User;

  constructor(private authservice: AuthenticationService,
              private dataservice: DataService,
              private snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {

    this.authservice.currentUser.subscribe((res) => {
      if (res.user) {
        return this.currentUser = res.user;
      }
    });

    this.newAppointment = {
      id: null,
      name: '',
      date: null,
      notes: null,
      sent: false,
      user_id: this.currentUser.id
    };
  }

  setName(name) {
    console.log(name);
    this.newAppointment.name = name;
    console.log(this.newAppointment);
  }

  setNotes(notes) {
    this.newAppointment.notes = notes;
  }

  setDate(date) {
    this.newAppointment.date = Date.parse(date);
  }

  submit() {
    if (this.newAppointment.name && this.newAppointment.date) {

      let strDate = this.newAppointment.date.toString(10);

      strDate = strDate.substring(0, strDate.length - 3);

      if (!this.newAppointment.notes) {
        this.newAppointment.notes = '';
      }

      this.newAppointment.date = parseInt(strDate, 10);

      return this.dataservice.saveAppointment(this.newAppointment).subscribe((res) => {
        this.router.navigate(['/dashboard']);
        return this.snackbar.open('Appointment added successfully !', 'Success', {
          duration: 3000
        });
      });
    } else {
      return this.snackbar.open('Please check your appointment object', 'Error', {
        duration: 3000
      });
    }
  }

}
