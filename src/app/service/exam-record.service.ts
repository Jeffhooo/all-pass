import { Injectable } from '@angular/core';
import { QuestionRecord } from '../vo/question-record';

@Injectable({
  providedIn: 'root'
})
export class ExamRecordService {
  readonly recordSuffix = '-record';

  public getQuestionRecord(examId: string): { [id: string]: QuestionRecord } {
    const qstRecordMap: { [id: string]: QuestionRecord } = JSON.parse(localStorage.getItem(examId + this.recordSuffix));
    return qstRecordMap ? qstRecordMap : {};
  }

  public setQuestionRecord(examId: string, qstRecordMap: { [id: string]: QuestionRecord }) {
    localStorage.setItem(examId + this.recordSuffix, JSON.stringify(qstRecordMap));
  }
}
