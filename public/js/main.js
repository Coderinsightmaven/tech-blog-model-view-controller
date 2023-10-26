
document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // TODO: Check if the user is logged in.
            // This is a placeholder check. Replace with actual session/authentication check.
            const isLoggedIn = false; // This should be replaced with actual logic

            if (!isLoggedIn) {
                e.preventDefault(); // Prevent the link from navigating
                alert('Please sign in or sign up to continue.'); // Replace this with a more suitable UI prompt
            }
        });
    });
});
