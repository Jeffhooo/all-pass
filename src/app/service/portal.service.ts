import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamBasicInfoVo } from '../vo/exam-basic-info.vo';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  constructor(private http: HttpClient) {}

  public getExamBasicInfoFromRes(): Observable<ExamBasicInfoVo[]> {
    return this.http.get<ExamBasicInfoVo[]>('assets/data/portal/basic-info.json');
  }
}
