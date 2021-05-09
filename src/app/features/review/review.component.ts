import { Component, OnInit } from '@angular/core';
import { ReviewItemVo } from '../../vo/review-item.vo';
import { REVIEW_TEXT } from '../../../resource/text/review.text';
import { ExamService } from '../../service/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionRecord } from '../../vo/question-record';
import { ExamRecordService } from '../../service/exam-record.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.less']
})
export class ReviewComponent implements OnInit {
  ready = false;
  locale = 'en';
  text: { [key: string]: string };

  examId: string;
  reviewItemList: ReviewItemVo[] = [];

  constructor(
    private examService: ExamService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examRecordService: ExamRecordService
  ) {}

  ngOnInit() {
    this.text = REVIEW_TEXT[this.locale];
    this.activatedRoute.queryParams.subscribe(params => {
      this.examId = params['examId'];
      const qstRecordMap = this.examRecordService.getQuestionRecord(this.examId);
      this.examService.getQuestionsFromRes(this.examId).subscribe(questions => {
        const reviewItemList: ReviewItemVo[] = [];
        for (const question of questions) {
          const qstRecord = qstRecordMap[question.id];
          reviewItemList.push({
            id: question.id,
            question: question.question,
            total: qstRecord ? qstRecord.total : 0,
            correct: qstRecord ? qstRecord.correct : 0
          });
        }
        this.reviewItemList = reviewItemList;
        this.ready = true;
      });
    });
  }

  onTitleClick() {
    this.router.navigate(['']);
  }

  onReviewItemClick(questionId: string) {
    this.router.navigate(['/exam'], { queryParams: { examId: this.examId, questionId } });
  }
}
