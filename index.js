const express = require('express');
const bodyParser = require('body-parser');
const { quiz } = require('./questions');
const app = express();
app.use(express.static('public')); //public ordner fuer css
const path = require('path');

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  //views ist unser ordner fuer .ejs datein


let score = 0;

//homepage
app.get('/', (req, res) => {
    res.render('index', { quizStarted: false });
});

//start quiz button
app.get('/startQuiz', (req, res) => {
    questionsAsked = 0;
    score = 0;
    res.redirect('/nextQuestion');
});

//quiz oder ergebnis
app.get('/nextQuestion', (req, res) => {
        
        if (questionsAsked < 10) {
            indexQuestion = Math.floor(Math.random() * 101),
        res.render('index', {
            
            quizStarted: true,
            question: quiz[indexQuestion],
            score: score
        });
    } else { 
        if(score < 7) {
            res.render('dumb', {
                score: score
            });
        } else {
            res.render('quizEnd', {
                score: score
            });
        }
        
    }
});

//quiz frage pruefen
app.post('/submitAnswer', (req, res) => {
    const userAnswerIndex = parseInt(req.body.answer);
    
    if (quiz[indexQuestion].antworten[userAnswerIndex].istRichtig) {
        score++;
    }

    questionsAsked++;
    res.redirect('/nextQuestion');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});


