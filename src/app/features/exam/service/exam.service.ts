import { Injectable } from '@angular/core';
import { QuestionVo } from '../vo/question.vo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient) {}

  public getQuestionsFromRes(id: string): Observable<QuestionVo[]> {
    return this.http.get<QuestionVo[]>('assets/data/exam/' + id + '.json');
  }
}
