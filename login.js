document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerLink = document.getElementById('register');
    const backToLoginLink = document.getElementById('backToLogin');

    registerLink.addEventListener('click', function () {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    backToLoginLink.addEventListener('click', function () {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkfehler - Server antwortet nicht');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'Erfolgreich eingeloggt') {
                console.log('Eingeloggt');
                window.open('https://pr2bm-danial.github.io/note/note1.html'); // Beispiel: neueSeite.html durch deine gewünschte Seite ersetzen
            } else {
                console.log('Erneut versuchen');
            }
        })
        .catch(error => console.error('Fehler:', error));
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword === confirmPassword) {
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername, password: newPassword })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Überprüfe den Content-Type der Antwort
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    throw new Error('Server returned non-JSON data');
                }
            })
            .then(data => {
                console.log('Erfolgreich registriert:', data.message);
                // Hier kannst du weitere Aktionen nach erfolgreicher Registrierung ausführen
            })
            .catch(error => {
                console.error('Fehler beim Registrieren:', error);
                // Hier kannst du den Fehler auf der Clientseite behandeln
            });            
        } else {
            console.log('Passwörter stimmen nicht überein');
            // Hier kannst du den Fall behandeln, wenn Passwörter nicht übereinstimmen
        }
    });
});
