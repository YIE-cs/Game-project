document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const logout = document.getElementById("logout");
    const scoreValue = document.getElementById("score-value");
    const welcomeMessage = document.getElementById("welcome-message");
    //show logout button + allow user to log out if user is signed in 
    if (currentUser) {
        if (logout) {
            logout.style.display = "block";
            logout.innerHTML = `<a href="#" id="logout-link">Logout</a>`;
            const logoutLink = document.getElementById("logout-link");
            if (logoutLink) {
                logoutLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    localStorage.removeItem("currentUser");
                    window.location.reload(); //to show new ui
                });
            }
        }
        // Update welcome message with username
        if (welcomeMessage) {
            welcomeMessage.innerText = `Welcome, ${currentUser.username}! Master the way of a shinobi!`;
        }
        // Update high score
        if (scoreValue) {
            scoreValue.innerText = currentUser.highScore !== undefined 
                ? currentUser.highScore 
                : "No high score yet!";
        }
    } else {
        if (logout) logout.style.display = "none";
        if (welcomeMessage) {
            welcomeMessage.innerText = "Master the Shinobi way in this engaging endless runner!";
        }
        if (scoreValue) {
            scoreValue.innerText = "Log in to track your score!";
        }
    }
});