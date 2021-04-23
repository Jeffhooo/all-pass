import { Injectable } from '@angular/core';
import { QuestionVo } from '../vo/question.vo';
import { QuestionMap } from '../../../../resource/data/exam/question-list';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  public getQuestionsFromRes(id: string): QuestionVo[] {
    return QuestionMap[id];
  }
}
