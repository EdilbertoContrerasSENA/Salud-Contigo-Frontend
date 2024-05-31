import { Injectable } from '@angular/core';
import {Doctor} from "../models/doctor";
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctors: Doctor[] = [];

  private url: string = 'http://localhost:8080/api/medicos';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.url}/${id}`);
  }

  create(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(this.url, doctor);
  }

  update(doctor: Doctor): Observable<Doctor>{
    return this.http.put<Doctor>(`${this.url}/id/${doctor.idmedico}`, doctor);
  }

  remove(id: number): Observable<number>{
    return this.http.delete<number>(`${this.url}/id/${id}`).pipe(
      map(() => id)
    );
  }

}
