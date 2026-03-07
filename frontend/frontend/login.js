const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/login', {  // your backend login endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful
            localStorage.setItem('token', data.token); // if your backend returns JWT
            window.location.href = 'dashboard.html';  // redirect to user dashboard
        } else {
            errorMsg.textContent = data.message || 'Login failed';
        }

    } catch (err) {
        errorMsg.textContent = 'Server error. Try again later.';
        console.error(err);
    }
});