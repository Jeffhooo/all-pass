import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType, QuestionVo } from '../../vo/question.vo';
import { ExamService } from '../../service/exam.service';
import { EXAM_TEXT } from '../../../resource/text/exam.text';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less']
})
export class ExamComponent implements OnInit {
  ready = false;
  locale = 'en';
  text: { [key: string]: string } = {};

  // request parameters
  examId: string;
  questionId: string;

  // question
  questionList: QuestionVo[] = [];
  questionIdxList: number[];
  curQuestion: QuestionVo;
  curQuestionIdx = 0;
  readonly singleSelect = QuestionType.SINGLE_SELECT;
  readonly multipleSelect = QuestionType.MULTIPLE_SELECT;

  // answer
  showAnswer = false;
  singleSelectAnswer: string;
  multipleSelectAnswers: boolean[] = [];

  // explanation
  explanationExpand = false;

  // pagination
  readonly pageSize = 5;
  curPageIdx = 0;
  disablePrevPage = true;
  disableNextPage = false;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.text = EXAM_TEXT[this.locale];
    this.activatedRoute.queryParams.subscribe(params => {
      this.examId = params['examId'];
      this.questionId = params['questionId'];
      if (this.examId) {
        this.examService.getQuestionsFromRes(this.examId).subscribe(res => {
          this.questionList = res;
          if (this.questionList.length > 0) {
            this.curQuestion = this.questionList[0];
            this.curQuestionIdx = 0;
            this.curPageIdx = 0;
            this.updatePagination();
            this.updateQuestionIdxList();
            this.initQuestion();
          }
          this.ready = true;
        });
      }
    });
  }

  onQuestionButtonClick(index: number) {
    this.showAnswer = false;
    this.curQuestion = this.questionList[index];
    this.curQuestionIdx = index;
  }

  onSubmitClick() {
    this.showAnswer = true;
  }

  onRadioClick(optionId: string) {
    this.singleSelectAnswer = optionId;
  }

  onPreviousQuestionClick() {
    if (this.curQuestionIdx > 0) {
      this.curQuestionIdx--;
      this.curQuestion = this.questionList[this.curQuestionIdx];
      this.curPageIdx = Math.floor(this.curQuestionIdx / this.pageSize);
      this.updatePagination();
      this.initQuestion();
      this.updateQuestionIdxList();
    }
  }

  onNextQuestionClick() {
    if (this.curQuestionIdx < this.questionList.length - 1) {
      this.curQuestionIdx++;
      this.curQuestion = this.questionList[this.curQuestionIdx];
      this.curPageIdx = Math.floor(this.curQuestionIdx / this.pageSize);
      this.updatePagination();
      this.initQuestion();
      this.updateQuestionIdxList();
    }
  }

  private initQuestion() {
    this.singleSelectAnswer = '';
    this.multipleSelectAnswers = [];
    this.showAnswer = false;
  }

  private updatePagination() {
    this.disablePrevPage = this.curPageIdx <= 0;
    this.disableNextPage = (this.curPageIdx + 1) * this.pageSize >= this.questionList.length;
  }

  private updateQuestionIdxList() {
    const questionList: number[] = [];
    const start = this.curPageIdx * this.pageSize;
    const end = Math.min(start + this.pageSize, this.questionList.length);
    for (let i = start; i < end; i++) {
      questionList.push(i);
    }
    this.questionIdxList = questionList;
  }

  onExplanationButtonClick() {
    this.explanationExpand = !this.explanationExpand;
  }

  onPreviousPageButtonClick() {
    if (this.curPageIdx > 0) {
      this.curPageIdx--;
      this.updateQuestionIdxList();
      this.disableNextPage = false;
    }
    if (this.curPageIdx === 0) {
      this.disablePrevPage = true;
    }
  }

  onNextPageButtonClick() {
    if ((this.curPageIdx + 1) * this.pageSize < this.questionList.length) {
      this.curPageIdx++;
      this.updateQuestionIdxList();
      this.disablePrevPage = false;
    }
    if ((this.curPageIdx + 1) * this.pageSize >= this.questionList.length) {
      this.disableNextPage = true;
    }
  }

  onTitleClick() {
    this.router.navigate(['']);
  }
}
