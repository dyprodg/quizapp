let aktuelleFrageIndex = 0;
let gesamtpunkte = 0;
let fragen = [];

window.onload = function() {
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        fragen = data;
    })
    .catch(error => console.error('Fehler:', error));
};

function startQuiz() {
    document.getElementById('startSeite').style.display = 'none';
    document.getElementById('quizFragen').style.display = 'block';
    naechsteFrage();
}

function renderAntworten(antworten) {
    let antwortenHTML = '';
    antworten.forEach((antwort, index) => {
        antwortenHTML += `<button onclick="antwortAusgewaehlt(${index})">${antwort.text}</button>`;
    });
    document.getElementById('antworten').innerHTML = antwortenHTML;
}

function naechsteFrage() {
    if (aktuelleFrageIndex < fragen.length) {
        let frage = fragen[aktuelleFrageIndex];
        document.getElementById('frageTitel').innerText = frage.titel;
        renderAntworten(frage.antworten);
    } else {
        document.getElementById('quizFragen').style.display = 'none';
        document.getElementById('ergebnis').style.display = 'block';
        document.getElementById('punkte').innerText = gesamtpunkte;
    }
}

function antwortAusgewaehlt(index) {
    let antwort = fragen[aktuelleFrageIndex].antworten[index];
    if (antwort.istRichtig) {
        gesamtpunkte += 1;
        document.getElementById('feedback').innerText = "Richtig!";
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').innerText = "Falsch!";
        document.getElementById('feedback').style.color = 'red';
    }
    aktuelleFrageIndex += 1;
    setTimeout(() => {
        document.getElementById('feedback').innerText = ""; // Diesen Feedback-Text zurücksetzen
        if (aktuelleFrageIndex < fragen.length) {
            naechsteFrage();
        } else {
            document.getElementById('quizFragen').style.display = 'none';
            document.getElementById('ergebnis').style.display = 'block';
            document.getElementById('punkte').innerText = gesamtpunkte;
        }
    }, 1000);
}


function neustart() {
    aktuelleFrageIndex = 0;
    gesamtpunkte = 0;
    startQuiz();
}
