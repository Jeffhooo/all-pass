import { OptionVo } from './option.vo';

export interface QuestionVo {
  type: QuestionType;

  question: string;

  options: OptionVo[];

  /**
   * correct option id list
   */
  answer: string[];

  explanation: string;
}

export enum QuestionType {
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT'
}
