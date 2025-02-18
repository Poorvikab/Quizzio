let currentQuestion = 1;
        const totalQuestions = 6;

        const questions = [
            {
                image: "/static/images/openquiz.png",
                text: "WHICH ANIMAL IS THE SHIP OF THE DESERT?",
                options: ["MONKEY", "WHALE", "CAMEL"],
                correctIndex: 2
            },
            {
                image: "/static/images/openquiz.png",
                text: "WHICH PLANET IS KNOWN AS THE RED PLANET?",
                options: ["EARTH", "MARS", "VENUS"],
                correctIndex: 1
            },
            {
                image: "/static/images/openquiz.png",
                text: "WHAT IS THE LARGEST MAMMAL?",
                options: ["ELEPHANT", "BLUE WHALE", "GIRAFFE"],
                correctIndex: 1
            },
            {
                image: "/static/images/openquiz.png",
                text: "HOW MANY HOURS ARE THERE IN A DAY?",
                options: [48, 24, 67],
                correctIndex: 1
            },

            {
                image: "/static/images/openquiz.png",
                text: "RAINBOW CONSITS OF HOW MANY COLOURS?",
                options: [3,9,7 ],
                correctIndex: 2
            },
            {
                image: "/static/images/openquiz.png",
                text: "DID YOU FIND IT FUN?",
                options: ["YES", "NO", "MAYBE"],
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

        