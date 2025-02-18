document.addEventListener("DOMContentLoaded", () => {
    const storedUsername = localStorage.getItem("username"); // Get username from localStorage
    const storedAvatar = localStorage.getItem("selectedAvatar"); // Get avatar from localStorage

    // Log values for debugging
    console.log("Username from localStorage: ", storedUsername);
    console.log("Avatar from localStorage: ", storedAvatar);

    if (storedUsername) {
        document.getElementById("displayName").innerHTML = `<u>${storedUsername}</u>`;
    } else {
        document.getElementById("displayName").innerHTML = "<u>Unknown</u>";
    }

    if (storedAvatar) {
        document.getElementById("displayAvatar").src = storedAvatar;
    } else {
        document.getElementById("displayAvatar").src = "/static/images/default_avatar.png"; // Placeholder if no avatar is found
    }

    // Handle "Enter" key redirect to code.html
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            window.location.href = "/templates/code.html"; // Redirect to code.html
        }
    });

    // Show hearts for quiz score
    const heartContainer = document.getElementById("heartContainer");
    const scoreData = JSON.parse(localStorage.getItem("quizScore")) || [];

    scoreData.forEach(result => {
        let heartImg = document.createElement("img");
        heartImg.src = result ? "/static/images/colored_heart.png" : "/static/images/empty_heart.png";
        heartImg.classList.add("heart");
        heartContainer.appendChild(heartImg);
    });
});
