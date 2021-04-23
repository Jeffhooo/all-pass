import { QuestionType, QuestionVo } from '../../../app/features/exam/vo/question.vo';

export const QuestionMap: { [examId: string]: QuestionVo[] } = {
  AWS_SAA: [
    {
      type: QuestionType.SINGLE_SELECT,
      question:
        'Which of the following describes a physical location around the world where AWS\n' + 'clusters data centers?',
      options: [
        { id: '1', detail: 'Endpoint' },
        { id: '2', detail: 'Collection' },
        { id: '3', detail: 'Fleet' },
        { id: '4', detail: 'Region' }
      ],
      answer: ['4']
    },
    {
      type: QuestionType.MULTIPLE_SELECT,
      question:
        'In what ways does Amazon Simple Storage Service (Amazon S3) object storage differ\n' +
        'from block and file storage? (Choose 2 answers)',
      options: [
        { id: '1', detail: 'Amazon S3 stores data in fixed size blocks.' },
        { id: '2', detail: 'Objects are identified by a numbered address.' },
        { id: '3', detail: 'Objects can be any size.' },
        { id: '4', detail: 'Objects contain both data and metadata.' },
        { id: '5', detail: 'Objects are stored in buckets.' }
      ],
      answer: ['4', '5']
    }
  ]
};
