import { Component, OnInit } from '@angular/core';
import { ReviewItemVo } from '../../vo/review-item.vo';
import { REVIEW_TEXT } from '../../../resource/text/review.text';
import { ExamService } from '../../service/exam.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private examService: ExamService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.text = REVIEW_TEXT[this.locale];
    this.activatedRoute.queryParams.subscribe(params => {
      this.examId = params['examId'];
      this.examService.getQuestionsFromRes(this.examId).subscribe(questions => {
        const reviewItemList: ReviewItemVo[] = [];
        for (const question of questions) {
          reviewItemList.push({
            id: question.id,
            question: question.question,
            total: 0,
            correct: 0
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
