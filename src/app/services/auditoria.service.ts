import { Injectable } from '@angular/core';
import {Auditoria} from "../models/auditoria";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private auditorias: Auditoria[] = [];

  private url: string = 'http://localhost:8080/api/auditorias';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Auditoria[]> {
    return this.http.get<Auditoria[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }
}
