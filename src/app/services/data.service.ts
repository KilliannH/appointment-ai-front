import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { config } from '../../../credentials';
import {Observable} from 'rxjs';

import {Appointment} from '../models/Appointment';

const baseUrl = `http://${config.HOST}:${config.PORT}/${config.prefix}`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}
  // Song
  getAppointments(): Observable<any> {
    return this.http.get(baseUrl + '/appointments');
  }

  getAppointment(id): Observable<any> {
    return this.http.get(baseUrl + '/appointments/' + id);
  }

  saveAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(baseUrl + '/appointments/', appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(baseUrl + '/appointments/' + id);
  }

}
