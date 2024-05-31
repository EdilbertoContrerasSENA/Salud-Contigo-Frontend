import { Injectable } from '@angular/core';
import {Patient} from "../models/patient";
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Patient[] = [];

  private url: string = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  create(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(this.url, patient);
  }

  update(patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(`${this.url}/id/${patient.idpaciente}`, patient);
  }

  remove(id: number): Observable<number>{
    return this.http.delete<number>(`${this.url}/id/${id}`).pipe(
      map(() => id)
    );
  }

}
