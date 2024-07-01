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
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = 'https://pr2bm-danial.github.io/tippspiel/tipp.html';
            } else {
                console.error('Login fehlgeschlagen:', data.message);
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
            .then(response => response.json())
            .then(data => {
                console.log('Erfolgreich registriert:', data.message);
                // Nach erfolgreicher Registrierung weitere Aktionen ausführen
            })
            .catch(error => console.error('Fehler beim Registrieren:', error));
        } else {
            console.log('Passwörter stimmen nicht überein');
        }
    });
});
