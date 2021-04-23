import { Injectable } from '@angular/core';
import { ExamBasicInfoVo } from '../vo/exam-basic-info.vo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  constructor(private http: HttpClient) {}

  public getExamBasicInfoFromRes(): Observable<ExamBasicInfoVo[]> {
    return this.http.get<ExamBasicInfoVo[]>('assets/data/portal/basic-info.json');
  }
}
