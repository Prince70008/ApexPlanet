document.addEventListener('DOMContentLoaded', () => {
  // ---- Quiz ----
  const quizData = [
    {
      question: 'What does CSS stand for?',
      options: [
        'Cascading Style Sheets',
        'Computer Style Sheets',
        'Creative Style Sheets',
        'Colorful Style Sheets',
      ],
      answer: 0,
    },
    {
      question: 'Which HTML element defines important text?',
      options: ['<strong>', '<b>', '<i>', '<em>'],
      answer: 0,
    },
    {
      question: 'Where do we put JavaScript in HTML?',
      options: ['<js>', '<script>', '<javascript>', '<code>'],
      answer: 1,
    },
  ];

  let currentQuestion = 0;
  const questionEl = document.getElementById('question');
  const options = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
    document.getElementById('option4'),
  ];
  const resultEl = document.getElementById('quiz-result');

  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    options.forEach((btn, idx) => {
      btn.textContent = q.options[idx];
      btn.onclick = () => {
        if (idx === q.answer) {
          resultEl.textContent = 'Correct!';
        } else {
          resultEl.textContent = 'Incorrect!';
        }

        currentQuestion++;
        if (currentQuestion < quizData.length) {
          setTimeout(() => {
            resultEl.textContent = '';
            loadQuestion();
          }, 1000);
        } else {
          setTimeout(() => {
            questionEl.textContent = 'Quiz Completed!';
            options.forEach(btn => btn.style.display = 'none');
            resultEl.textContent = '';
          }, 1000);
        }
      };
    });
  }

  if (questionEl && options.length === 4) {
    loadQuestion();
  }

  // ---- API Data Fetch ----
  const userDataContainer = document.getElementById('user-data');
  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];
      userDataContainer.innerHTML = `
        <img src="${user.picture.medium}" alt="User photo" />
        <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Country:</strong> ${user.location.country}</p>
      `;
    })
    .catch(error => {
      userDataContainer.innerHTML = `<p>Error fetching data.</p>`;
      console.error('API Error:', error);
    });
});

