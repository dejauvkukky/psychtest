const quizDiv = document.getElementById('quiz');
let answers = [];

quizData.forEach((q, i) => {
  const qDiv = document.createElement('div');
  qDiv.className = 'question-block';

  const question = document.createElement('p');
  question.className = 'question';
  question.innerText = q.question;

  qDiv.appendChild(question);

  q.options.forEach((opt, idx) => {
    const label = document.createElement('label');
    label.className = 'option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'q' + i;
    input.value = q.scores[idx];
    input.onchange = () => {
      answers[i] = parseInt(input.value);
    }
    label.appendChild(input);
    label.appendChild(document.createTextNode(opt));
    qDiv.appendChild(label);
  });

  quizDiv.appendChild(qDiv);
});

function showResult() {
  if (answers.length !== quizData.length || answers.includes(undefined)) {
    alert('모든 문항에 응답해 주세요.');
    return;
  }
  const sum = answers.reduce((a, b) => a + b, 0);
  let result = '';
  for (let r of resultMap) {
    if (sum <= r.max) {
      result = r.text;
      break;
    }
  }
  document.getElementById('result').innerText = result;

  // 공유 링크 생성
  const url = new URL(window.location.href);
  url.searchParams.set('score', sum);
  document.getElementById('shareLink').value = url.toString();
  document.getElementById('share').style.display = 'block';
}

// 공유 링크 파라미터 체크
const params = new URLSearchParams(window.location.search);
if (params.has('score')) {
  const score = parseInt(params.get('score'));
  for (let r of resultMap) {
    if (score <= r.max) {
      document.getElementById('result').innerText = r.text;
      break;
    }
  }
}
