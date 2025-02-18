let currentQuestion = 1;
        const totalQuestions = 6;

        const questions = [
            {
                image: "/static/images/openquiz.png",
                text: "WHICH PART OF THE PLANT MAKES FOOD ?",
                options: ["ROOT", "STEM", "LEAF"],
                correctIndex: 2
            },
            {
                image: "/static/images/openquiz.png",
                text: "WHICH ANIMAL BREATHES THROUGH IT'S SKIN ?",
                options: ["FROG", "FISH", "BIRD"],
                correctIndex: 0
            },
            {
                image: "/static/images/openquiz.png",
                text: "WHAT IS THE BOILING POINT OF WATER ?",
                options: ["50", "100", "75"],
                correctIndex: 1
            },
            {
                image: "/static/images/openquiz.png",
                text: "HOW MANY LEGS DOES A SPIDER HAVE ?",
                options: [2, 4, 8],
                correctIndex: 2
            },

            {
                image: "/static/images/openquiz.png",
                text: "WHAT IS THE LARGEST ORGAN IN THE HUMAN BODY ?",
                options: ["HEART","SKIN","LIVER" ],
                correctIndex: 1
            },
            {
                image: "/static/images/openquiz.png",
                text: "WHAT IS THE CENTER OF AN ATOM CALLED ?",
                options: ["NUCLEUS", "PROTON", "ELECTRON"],
                correctIndex: 0

            },

            
        ];

        let score = [];

        function checkAnswer(button, isCorrect) {
    let image = button.querySelector("img");
    let options = document.querySelectorAll(".option");

    // Disable all buttons
    options.forEach(btn => btn.disabled = true);

    // Change image based on correctness
    image.src = isCorrect ? "/static/images/openquizc.png" : "/static/images/openquizw.png";

    // Play the correct or incorrect sound
    let correctSound = document.getElementById("correctSound");
    let incorrectSound = document.getElementById("incorrectSound");
    
    if (isCorrect) {
        correctSound.currentTime = 0;  // Reset audio to start
        correctSound.play();  // Play correct sound
    } else {
        incorrectSound.currentTime = 0;  // Reset audio to start
        incorrectSound.play();  // Play incorrect sound
    }

    // Store the result (1 for correct, 0 for incorrect)
    score.push(isCorrect ? 1 : 0);
    localStorage.setItem("quizScore", JSON.stringify(score));

    // Move to next question after 2 seconds
    setTimeout(nextQuestion, 1000);
}

        function nextQuestion() {
            if (currentQuestion < totalQuestions) {
                currentQuestion++;

                let q = questions[currentQuestion - 1];

               
                document.getElementById("question-text").innerText = q.text;

                let answers = document.querySelectorAll("h3");
                let buttons = document.querySelectorAll(".option");

                // Reset button images and enable buttons
                buttons.forEach((button, index) => {
                    button.querySelector("img").src = "/static/images/openquiz1.png";
                    button.onclick = () => checkAnswer(button, index === q.correctIndex);
                    answers[index].innerText = q.options[index];
                    button.disabled = false;
                });

            } else {
                window.location.href = "/score";

            }
        }