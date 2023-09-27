let gestellteFragen = 0;
let gesamtpunkte = 0;
let fragen = [];

window.onload = function() {
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        fragen = data;
        startQuiz(); // Starten Sie das Quiz nachdem die Fragen geladen wurden
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
    if (gestellteFragen < 10 && fragen.length > 0) {
        let zufallIndex = Math.floor(Math.random() * fragen.length);
        let frage = fragen[zufallIndex];
        document.getElementById('frageTitel').innerText = frage.titel;
        renderAntworten(frage.antworten);
        fragen.splice(zufallIndex, 1); // Frage aus dem Array entfernen
        gestellteFragen++;
    } else {
        document.getElementById('quizFragen').style.display = 'none';
        document.getElementById('ergebnis').style.display = 'block';
        document.getElementById('punkte').innerText = gesamtpunkte;
    }
}

function antwortAusgewaehlt(index) {
    let aktuelleFrage = fragen[gestellteFragen - 1]; // Letzte Frage holen
    let antwort = aktuelleFrage.antworten[index];
    if (antwort.istRichtig) {
        gesamtpunkte += 1;
        document.getElementById('feedback').innerText = "Richtig!";
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').innerText = "Falsch!";
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
    // Fragenliste erneut laden
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        fragen = data;
        startQuiz();
    })
    .catch(error => console.error('Fehler:', error));
}
