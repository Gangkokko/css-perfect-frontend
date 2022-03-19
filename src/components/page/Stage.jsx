import { useState } from 'react';

const QuestionLists = [
  {
    Question: '1.早稲田出身の選手は?',
    Answers: ['大迫傑選手', '服部勇馬選手', '中村匠吾選手', '相澤晃選手'],
    Correct: '大迫傑選手',
    selectedAnswer: '',
  },
  {
    Question: '2.東洋出身の選手は?',
    Answers: ['大迫傑選手', '服部勇馬選手', '中村匠吾選手', '相澤晃選手'],
    Correct: '服部勇馬選手',
    selectedAnswer: '',
  },
  {
    Question: '3.駒澤出身の選手は?',
    Answers: ['大迫傑選手', '服部勇馬選手', '中村匠吾選手', '相澤晃選手'],
    Correct: '中村匠吾選手',
    selectedAnswer: '',
  },
];

const Stage = () => {
  const [qLIsts, setqLists] = useState(QuestionLists);
  const inputAnswer = (selectedAnswer, targetIndex) => {
    setqLists(qLIsts.map((list, index) => (index === targetIndex ? { ...list, selectedAnswer } : list)));
  };
  return (
    <div>
      {qLIsts.map(({ Question, Answers, Correct, selectedAnswer }, index) => {
        return (
          <div key={Question}>
            <h1>{Question}</h1>
            <div>
              {Answers.map((answer) => {
                return (
                  <button key={answer} onClick={() => inputAnswer(answer, index)}>
                    {answer}
                  </button>
                );
              })}
            </div>
            {selectedAnswer && <div>{Correct === selectedAnswer ? '正解' : '不正解'}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Stage;
