document.addEventListener("DOMContentLoaded", function () {
    const scoreboardBody = document.getElementById("scoreboard-body");
    const message = document.getElementById("message");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Filter out users without a high score and sort by highScore in descending order
    users = users
        .filter(user => user.highScore !== undefined && user.highScore !== null)
        .sort((a, b) => b.highScore - a.highScore);

    // Clear any existing content
    scoreboardBody.innerHTML = "";

    // Check if there are any scores to display
    if (users.length === 0) {
        message.innerText = "No scores available yet.";
        return;
    }

    // Populate the scoreboard table
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        
        // Highlight the current user's row if logged in
        if (currentUser && user.email === currentUser.email) {
            row.style.backgroundColor = "#2f2f51ff"; 
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.highScore}</td>
        `;
        scoreboardBody.appendChild(row);
    });
});