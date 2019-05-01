import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Appointment} from '../models/Appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appointents: Array<Appointment>;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    return this.dataservice.getAppointments().subscribe((res) => {
      if (res) {
        console.log(res.appointments);
        return this.appointents = res.appointments;
      }
    });
  }

}
