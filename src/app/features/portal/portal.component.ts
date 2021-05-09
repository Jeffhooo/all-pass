import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamBasicInfoVo } from '../../vo/exam-basic-info.vo';
import { PortalService } from '../../service/portal.service';
import { PORTAL_TEXT } from '../../../resource/text/portal.text';
import { ExamType } from '../../enum/exam-type';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.less']
})
export class PortalComponent implements OnInit {
  ready = false;
  locale = 'en';
  text: { [key: string]: string } = {};

  allExams: ExamBasicInfoVo[] = [];

  // search
  searchKeyword = '';
  filteredExams: ExamBasicInfoVo[] = [];

  constructor(private portalService: PortalService, private router: Router) {}

  ngOnInit() {
    this.text = PORTAL_TEXT[this.locale];
    this.portalService.getExamBasicInfoFromRes().subscribe(res => {
      this.allExams = res;
      this.filteredExams = this.allExams;
      this.ready = true;
    });
  }

  onStartClick(id: string) {
    this.router.navigate(['/exam'], { queryParams: { examId: id, type: ExamType.START } });
  }

  onReviewClick(id: string) {
    this.router.navigate(['/review'], { queryParams: { examId: id } });
  }

  onSearchButtonClick() {
    if (this.searchKeyword) {
      const filteredExams: ExamBasicInfoVo[] = [];
      for (const exam of this.allExams) {
        if (
          this.matchKeyword(exam.name, this.searchKeyword) ||
          this.matchKeyword(exam.description, this.searchKeyword)
        ) {
          filteredExams.push(exam);
        }
      }
      this.filteredExams = filteredExams;
    } else {
      this.filteredExams = this.allExams;
    }
  }

  private matchKeyword(text: string, keyword: string): boolean {
    return keyword && text && text.toUpperCase().includes(keyword.toUpperCase().trim());
  }
}
