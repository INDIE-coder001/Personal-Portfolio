document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        // Simple validation
        if (!name) {
            formMessage.textContent = 'Please enter your name.';
            formMessage.style.color = '#d32f2f';
            return;
        }
        if (!validateEmail(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = '#d32f2f';
            return;
        }
        if (!message) {
            formMessage.textContent = 'Please enter your message.';
            formMessage.style.color = '#d32f2f';
            return;
        }

        // Send data to backend server
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => {
            if (response.ok) {
                formMessage.textContent = 'Thank you! Your message has been sent.';
                formMessage.style.color = '#388e3c';
                form.reset();
            } else {
                formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                formMessage.style.color = '#d32f2f';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            formMessage.textContent = 'Network error. Please check your connection.';
            formMessage.style.color = '#d32f2f';
        });
    });

    function validateEmail(email) {
        // Simple email regex
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    }
});