import { Injectable } from '@angular/core';
import {Appointment} from "../models/appointment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointments: Appointment[] = [];

  private url: string = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.url}/${id}`);
  }

  create(appointment: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(this.url, appointment);
  }

  update(appointment: Appointment): Observable<Appointment>{
    return this.http.put<Appointment>(`${this.url}/id/${appointment.idcita}`, appointment);
  }

  remove(id: number): Observable<number>{
    return this.http.delete<number>(`${this.url}/id/${id}`).pipe(
      map(() => id)
    );
  }

}
