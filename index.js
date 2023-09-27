let gestellteFragen = 0;
let gesamtpunkte = 0;
let fragen = [];
let aktuelleFrageIndex = 0;

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
    if (gestellteFragen < 10 && aktuelleFrageIndex < fragen.length) {
        let frage = fragen[aktuelleFrageIndex];
        document.getElementById('frageTitel').innerText = frage.titel;
        renderAntworten(frage.antworten);
        gestellteFragen++;
        aktuelleFrageIndex++;
    } else {
        document.getElementById('quizFragen').style.display = 'none';
        document.getElementById('ergebnis').style.display = 'block';
        document.getElementById('punkte').innerText = gesamtpunkte;

        let nachricht = document.getElementById('nachricht');
        if (gesamtpunkte > 8) {
            nachricht.innerText = "Gut gemacht!";
        } else if (gesamtpunkte > 5) {
            nachricht.innerText = "Nicht schlecht!";
        } else {
            nachricht.innerText = "Weiter üben!";
        }
    }
}

function antwortAusgewaehlt(index) {
    let aktuelleFrage = fragen[aktuelleFrageIndex - 1]; // Letzte Frage holen
    let antwort = aktuelleFrage.antworten[index];
    if (antwort.istRichtig) {
        gesamtpunkte += 1;
        document.getElementById('feedback').innerText = "Richtig!";
        document.getElementById('feedback').style.color = 'green';
    } else {
        let richtigeAntwort = aktuelleFrage.antworten.find(a => a.istRichtig);
        document.getElementById('feedback').innerText = `Falsch! Die richtige Antwort war: ${richtigeAntwort.text}`;
        document.getElementById('feedback').style.color = 'red';
    }

    setTimeout(() => {
        document.getElementById('feedback').innerText = ""; // Feedback-Text zurücksetzen
        naechsteFrage();
    }, 1000);
}

function neustart() {
    gestellteFragen = 0;
    gesamtpunkte = 0;
    aktuelleFrageIndex = 0;
    // Fragenliste erneut laden, ist aber optional. Es wäre ausreichend, den aktuelleFrageIndex zurückzusetzen.
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        fragen = data;
        startQuiz();
    })
    .catch(error => console.error('Fehler:', error));
}
