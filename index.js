const express = require('express');
const bodyParser = require('body-parser');
const { quiz } = require('./questions');
const app = express();
const path = require('path');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// EJS View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Setzen des 'views'-Pfads

let currentQuestionIndex = 0;
let score = 0;

app.get('/', (req, res) => {
    res.render('index', { quizStarted: false });
});

app.get('/startQuiz', (req, res) => {
    currentQuestionIndex = 0;
    score = 0;
    res.redirect('/nextQuestion');
});

app.get('/nextQuestion', (req, res) => {
    if (currentQuestionIndex < quiz.length) {
        res.render('index', {
            quizStarted: true,
            question: quiz[currentQuestionIndex],
            score: score
        });
    } else {
        // Ändern der Ausgabe, wenn das Quiz vorbei ist
        res.render('quizEnd', {
            score: score
        });
    }
});

app.post('/submitAnswer', (req, res) => {
    const userAnswerIndex = parseInt(req.body.answer);
    const correctAnswer = quiz[currentQuestionIndex].antworten.find(a => a.istRichtig);
    
    if (quiz[currentQuestionIndex].antworten[userAnswerIndex].istRichtig) {
        score++;
    }

    currentQuestionIndex++;
    res.redirect('/nextQuestion');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
