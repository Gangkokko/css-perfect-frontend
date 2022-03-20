import { useState } from 'react';

const QuestionLists = [
  {
    Question: 'CSSの「margin」プロパティで下方向に10px余白を設ける記述はどれ？',
    Answers: ['margin: 0px 0px 10px;', 'margin: 0px 10px 0px;', 'margin: 0px 0px 0px 10px;', 'margin: 10px 10px 10px;'],
    Correct: 'margin: 0px 0px 10px;',
    selectedAnswer: '',
  },
  {
    Question: 'CSSセレクタで2番目から5番目までの兄弟要素の範囲指定をしているのはどれ？',
    Answers: ['セレクタ名:nth-child(-n+2):nth-child(-n+5) {〜}', 'セレクタ名:nth-child(n+2):nth-child(n+5) {〜}', 'セレクタ名:nth-child(n+2):nth-child(-n+5) {〜}', 'セレクタ名:nth-child(n-2):nth-child(-n-5) {〜}'],
    Correct: 'セレクタ名:nth-child(n+2):nth-child(-n+5) {〜}',
    selectedAnswer: '',
  },
  {
    Question: 'border-image-repeatの意味はどれ？',
    Answers: ['画像ボーダーの繰り返し方法', 'トランジションのディレイ', 'マルチカラムのカラムの横幅', 'ボーダーの太さ'],
    Correct: '画像ボーダーの繰り返し方法',
    selectedAnswer: '',
  },
  {
    Question: 'animation-duration の説明はどれ？',
    Answers: ['マルチカラムの区切り線の太さ', '上マージン', 'アニメーションの再生時間', '要素の変化量'],
    Correct: 'アニメーションの再生時間',
    selectedAnswer: '',
  },
  {
    Question: 'border-collapseの説明はどれ？',
    Answers: ['テーブルの罫線の表示方法', '背景画像の表示位置の基点', '文字の影付け', 'ボーダーの色'],
    Correct: 'テーブルの罫線の表示方法',
    selectedAnswer: '',
  },
];

const Problem = () => {
  const [qLIsts, setqLists] = useState(QuestionLists);
  const inputAnswer = (selectedAnswer, targetIndex) => {
    setqLists(qLIsts.map((list, index) => (index === targetIndex ? { ...list, selectedAnswer } : list)));
  };
  return (
    <div>
      <div className='bg-yellow-400 p-4'>
        <div className='container flex justify-center items-center overflow-hidden mx-auto px-4 flex-col border-8 border-black p-2'>
          {qLIsts.map(({ Question, Answers, Correct, selectedAnswer }, index) => {
            return (
              <div key={Question} className='bg-[#CECDAE] w-full mb-8 py-8'>
                <h1 className='text-xl md:text-2xl text-center mb-8'>{Question}</h1>
                <div>
                  {Answers.map((answer) => {
                    return (
                      <button className='block mx-auto text-lg mb-8 transform duration-1000 hover:scale-150' key={answer} onClick={() => inputAnswer(answer, index)}>
                        {answer}
                      </button>
                    );
                  })}
                </div>
                {selectedAnswer && <div className='text-3xl text-red-500 text-center'>{Correct === selectedAnswer ? '正解' : '不正解'}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Problem;
