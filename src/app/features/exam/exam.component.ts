import { Component, OnInit } from '@angular/core';
import { ExamService } from './service/exam.service';
import { EXAM_TEXT } from '../../../resource/text/exam/exam.text';
import { QuestionType, QuestionVo } from './vo/question.vo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less']
})
export class ExamComponent implements OnInit {
  ready = false;
  locale = 'en';
  text: { [key: string]: string } = {};
  examId: string;

  // question
  questionList: QuestionVo[] = [];
  currentPageIndex = 0;
  readonly pageSize = 5;
  curQuestionIdxList: number[];
  currentQuestion: QuestionVo;
  currentQuestionIndex = 0;
  readonly singleSelect = QuestionType.SINGLE_SELECT;
  readonly multipleSelect = QuestionType.MULTIPLE_SELECT;

  // answer
  showAnswer = false;
  singleSelectAnswer: string;
  multipleSelectAnswers: boolean[] = [];

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.text = EXAM_TEXT[this.locale];
    this.activatedRoute.queryParams.subscribe(params => {
      this.examId = params['examId'];
      if (this.examId) {
        this.examService.getQuestionsFromRes(this.examId).subscribe(res => {
          this.questionList = res;
          if (this.questionList.length > 0) {
            this.currentQuestion = this.questionList[0];
            this.currentQuestionIndex = 0;
            this.initQuestion();
            this.updateQuestionList();
          }
          this.ready = true;
        });
      }
    });
  }

  onQuestionButtonClick(index: number) {
    this.showAnswer = false;
    this.currentQuestion = this.questionList[index];
    this.currentQuestionIndex = index;
    this.updateQuestionList();
  }

  onSubmitClick() {
    this.showAnswer = true;
  }

  onRadioClick(optionId: string) {
    this.singleSelectAnswer = optionId;
  }

  onBackClick() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questionList[this.currentQuestionIndex];
      this.initQuestion();
      this.updateQuestionList();
    }
  }

  onNextClick() {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questionList[this.currentQuestionIndex];
      this.initQuestion();
      this.updateQuestionList();
    }
  }

  private initQuestion() {
    this.singleSelectAnswer = '';
    this.multipleSelectAnswers = [];
    this.showAnswer = false;
  }

  private updateQuestionList() {
    const questionList: number[] = [];
    this.currentPageIndex = Math.floor(this.currentQuestionIndex / this.pageSize);
    const start = this.currentPageIndex * this.pageSize;
    const end = Math.min(start + this.pageSize, this.questionList.length);
    for (let i = start; i < end; i++) {
      questionList.push(i);
    }
    this.curQuestionIdxList = questionList;
  }
}
