import { Component, OnInit } from '@angular/core';
import { PortalService } from './service/portal.service';
import { ExamBasicInfoVo } from './vo/exam-basic-info.vo';
import { PORTAL_TEXT } from '../../../resource/text/portal/portal.text';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.less']
})
export class PortalComponent implements OnInit {
  ready = false;
  locale = 'en';
  text: { [key: string]: string } = {};
  examBasicInfoList: ExamBasicInfoVo[] = [];

  constructor(private portalService: PortalService, private router: Router) {}

  ngOnInit() {
    this.text = PORTAL_TEXT[this.locale];
    this.examBasicInfoList = this.portalService.getExamBasicInfoFromRes();
    this.ready = true;
  }

  onViewClick(id: string) {
    console.log('exam view click id: ', id);
    this.router.navigate(['/exam'], { queryParams: { examId: id } });
  }
}
