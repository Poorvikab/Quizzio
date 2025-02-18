// function playSoundAndRedirect(page) {
//     let sound = document.getElementById("clickSound");
//     sound.play(); // Play sound

//     // Wait for sound to finish before redirecting (optional)
//     setTimeout(function() {
//         window.location.href = page;
//     }, 500); // Adjust timing based on sound duration
// }

document.getElementById('select').addEventListener('click', function () {
    let clickSound = document.getElementById('clickSound');
    clickSound.play();
});
