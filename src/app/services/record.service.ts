import { Injectable } from '@angular/core';
import {Record} from "../models/record";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private records: Record[] = [];

  private url: string = 'http://localhost:8080/api/historias';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Record[]> {
    return this.http.get<Record[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<Record> {
    return this.http.get<Record>(`${this.url}/${id}`);
  }

  create(record: Record): Observable<Record>{
    return this.http.post<Record>(this.url, record);
  }

  update(record: Record): Observable<Record>{
    return this.http.put<Record>(`${this.url}/id/${record.idhistoria}`, record);
  }

  remove(id: number): Observable<number>{
    return this.http.delete<number>(`${this.url}/id/${id}`).pipe(
      map(() => id)
    );
  }

}
