// Create an audio object
let clickSound = new Audio("/static/audio/click2.wav"); // Replace with your actual sound file
    
document.getElementById("addbtn").addEventListener("click", function (event) {
    event.preventDefault();

    // Play sound
    clickSound.play();

    // Show popup
    document.getElementById("popup").style.display = "block";
    document.getElementById("inputBox").focus();
});

document.getElementById("inputBox").addEventListener("keypress", function (event) {
    if (event.key === "Enter" && this.value.trim() !== "") {
        event.preventDefault();
        let name = this.value.trim();

        // Create folder element
        let folderDiv = document.createElement("div");
        folderDiv.classList.add("folder");

        let img = document.createElement("img");
        img.src = "/static/images/folderpng.png"; // Folder Image

        let span = document.createElement("span");
        span.innerText = name;

        folderDiv.appendChild(img);
        folderDiv.appendChild(span);
        document.getElementById("folderContainer").appendChild(folderDiv);

        // Hide popup
        document.getElementById("popup").style.display = "none";
        this.value = ""; // Clear input
    }
});