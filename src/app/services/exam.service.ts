import { Injectable } from '@angular/core';
import {Exam} from "../models/exam";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private exams: Exam[] = [];

  private url: string = 'http://localhost:8080/api/examenes';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.url}/${id}`);
  }

  create(exam: Exam): Observable<Exam>{
    return this.http.post<Exam>(this.url, exam);
  }

  update(exam: Exam): Observable<Exam>{
    return this.http.put<Exam>(`${this.url}/id/${exam.idexamen}`, exam);
  }

  remove(id: number): Observable<number>{
    return this.http.delete<number>(`${this.url}/id/${id}`).pipe(
      map(() => id)
    );
  }

}
