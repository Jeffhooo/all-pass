import { Injectable } from '@angular/core';
import { ExamBasicInfoVo } from '../vo/exam-basic-info.vo';
import { ExamBasicInfoList } from '../../../../resource/data/portal/exam-basic-info-list';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  public getExamBasicInfoFromRes(): ExamBasicInfoVo[] {
    return ExamBasicInfoList;
  }
}
