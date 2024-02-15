const questions = [
    {
        question: "1. Imagine your ideal date night ambiance. Which scenario resonates with you the most?",
        answers: [
            { text: "A cozy evening, filled with games, conversation, movies, and wine.", type: "Cozy" },
            { text: "An adventurous escapade where we create new memories and embrace spontaneity.", type: "Adventure" },
            { text: "A cultural exploration, delving into art, music, or literature.", type: "Cultural" },
            { text: "A romantic journey through culinary delights, savoring flavors that ignite our senses.", type: "Romantic" }
        ],
    },
    {
        question: "2. Your heart craves:",
        answers: [
            { text: "A touch of mystery and excitement, sparking our sense of adventure.", type: "Adventure" },
            { text: "A tranquil sanctuary, enveloped in warmth and comfort.", type: "Cozy" },
            { text: "A burst of creativity and inspiration, igniting our imaginations.", type: "Cultural" },
            { text: "A sensory feast, tantalizing our taste buds with culinary delights.", type: "Romantic" }
        ],
    },
    {
        question: "3. Which of these activities resonates with you?",
        answers: [
            { text: "Relaxing with our pup and talking with your husband about how great your life is.", type: "Cozy" },
            { text: "Embracing the beauty of nature on a beautiful sunny day.", type: "Adventure" },
            { text: "Indulging in a culinary adventure that transports us to distant lands.", type: "Romantic" },
            { text: "Immersing ourselves in the magic of storytelling and shared experiences.", type: "Cultural" }
        ],
    },
    {
        question: "4. What's your preferred way to end a perfect date?",
        answers: [
            { text: "Sharing a homemade dessert under the stars, feeling the magic in the air.", type: "Romantic" },
            { text: "Getting lost in an engaging board game or puzzle, enjoying each other's company.", type: "Cozy" },
            { text: "Taking a spontaneous night drive, with no destination in mind, just us and the road.", type: "Adventure" },
            { text: "Discussing our favorite books or films, diving deep into the stories that move us.", type: "Cultural" }
        ],
    },
    {
        question: "5. What's your ideal setting for a memorable conversation?",
        answers: [
            { text: "A quiet café, where we can hear each other over coffee and pastries.", type: "Cozy" },
            { text: "A scenic hike, where every turn offers a new topic of discussion.", type: "Adventure" },
            { text: "A museum or art gallery, where we can discuss our interpretations of the exhibits.", type: "Cultural" },
            { text: "A gourmet restaurant, where the ambiance sets the stage for deep conversations.", type: "Romantic" }
        ],
    },
    {
        question: "6. How do you prefer to spend a lazy Sunday?",
        answers: [
            { text: "Cuddling on the couch with a good book or binge-watching a series.", type: "Cozy" },
            { text: "Exploring a nearby town or city we've never been to before.", type: "Adventure" },
            { text: "Visiting a local theater for a play or a live music performance.", type: "Cultural" },
            { text: "Cooking a fancy brunch together, experimenting with new recipes.", type: "Romantic" }
        ],
    },
    {
        question: "7. What element of surprise do you enjoy on a date?",
        answers: [
            { text: "A surprise movie night complete with popcorn and a selection of our favorite films.", type: "Cozy" },
            { text: "An unexpected adventure, like kayaking or a hot air balloon ride.", type: "Adventure" },
            { text: "Tickets to a surprise cultural event, like a concert or art exhibit opening.", type: "Cultural" },
            { text: "A surprise dinner at a new or exotic restaurant we've both wanted to try.", type: "Romantic" }
        ],
    },
    {
        question: "8. What best describes your dream date activity?",
        answers: [
            { text: "Building a fort out of blankets and watching the stars from our backyard.", type: "Cozy" },
            { text: "Going on a treasure hunt or geocaching in our city.", type: "Adventure" },
            { text: "Attending a workshop or class together, like pottery or painting.", type: "Cultural" },
            { text: "Taking a cooking class together to learn how to prepare a dish from a cuisine we love.", type: "Romantic" }
        ],
    },
    {
        question: "9. What's your idea of a perfect weekend activity together?",
        answers: [
            { text: "Building something or engaging in a DIY project, creating memories along the way.", type: "Cozy" },
            { text: "Setting off on an early morning hike or bike ride, embracing the thrill of the outdoors.", type: "Adventure" },
            { text: "Visiting a museum, gallery, or attending a workshop to learn something new together.", type: "Cultural" },
            { text: "Exploring a new or favorite restaurant for a leisurely brunch or dinner.", type: "Romantic" }
        ],
    },
    {
        question: "10. How do you prefer to celebrate an anniversary or special occasion?",
        answers: [
            { text: "Planning a surprise getaway to a place we've always wanted to visit or experience together.", type: "Adventure" },
            { text: "A quiet, intimate evening at home with our favorite movie, meal, and reminiscing about our journey together.", type: "Cozy" },
            { text: "Attending a live performance or event that is meaningful to both of us.", type: "Cultural" },
            { text: "Booking a luxurious experience, like a spa day or fine dining at a high-end restaurant.", type: "Romantic" }
        ],
    }
    
];

let currentQuestionIndex = 0;
let results = { Cozy: 0, Adventure: 0, Cultural: 0, Romantic: 0 };

function showQuestion(question) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<h3>${question.question}</h3>`;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.type));
        questionContainer.appendChild(button);
    });
}

function selectAnswer(type) {
    results[type]++;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showResults() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    let suggestion = determineDateNight();
    questionContainer.innerHTML = `<h3>Our date night is: ${suggestion}</h3>`;
}

function calculatePercentages() {
    const total = Object.values(results).reduce((acc, curr) => acc + curr, 0);
    const percentages = {};
    for (const category in results) {
        percentages[category] = (results[category] / total) * 100;
    }
    return percentages;
}

function determineDateNight() {
    const percentages = calculatePercentages();
    const sortedCategories = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);

    // Check for dominant preference or combinations
    if (percentages[sortedCategories[0]] >= 70) {
        // Strong preference for one category
        return suggestDateBasedOnCategory(sortedCategories[0]);
    } else{
        // Combination of two categories
        return suggestCombinationDate(sortedCategories[0], sortedCategories[1]);
    } 
    // } else if (percentages[sortedCategories[0]] < 70 && percentages[sortedCategories[1]] > 20) {
    //     // Combination of two categories
    //     return suggestCombinationDate(sortedCategories[0], sortedCategories[1]);
    // } 
    // else {
    //     // More balanced or other scenarios
    //     return "A custom adventure blending our shared interests and desires!";
    // }
}

function suggestDateBasedOnCategory(category) {
    switch (category) {
        case "Adventure":
            return "Embark on a hike to a secluded spot, where we cloudgaze and share small bites.";
        case "Cozy":
            return "Create a nostalgic indoor fort with fairy lights and cozy blankets, talking and playing cozy games.";
        case "Cultural":
            return "Explore a local art walk or street performance, finding the creativity of our community.";
        case "Romantic":
            return "Dine at a rooftop restaurant with views of the city skyline, toasting to our love against a backdrop of twinkling lights.";
        default:
            return "Something uniquely special tailored to our tastes!";
    }
}
function suggestCombinationDate(primary, secondary) {
    console.log("P: " + primary);
    console.log("S: " + secondary);

    // Sort the categories to ensure the order doesn't matter
    const sortCats = [primary, secondary].sort().join(" & ");

    switch (sortCats) {
        case "Adventure & Cozy":
            return "Plan a cozy cabin getaway where you can explore nearby trails during the day and relax by the fireplace at night.";
        case "Cultural & Romantic":
            return "Attend a night at the opera or a symphony performance, followed by a late-night dessert café.";
        case "Adventure & Cultural":
            return "Embark on a cultural scavenger hunt through the city, discovering hidden gems and historical landmarks.";
        case "Cozy & Romantic":
            return "A night in, cooking a new recipe together followed by watching a classic romantic movie.";
        case "Cultural & Cozy":
            return "A relaxed evening visiting a local bookstore or library event, then discussing your finds over coffee in a cozy café.";
        case "Adventure & Romantic":
            return "A sunset sail or a hot air balloon ride, capped off with a picnic under the stars.";
        case "Romantic & Cultural":
            return "A date night at a museum or gallery opening, followed by a romantic dinner at a restaurant with cultural significance.";
        case "Cozy & Cultural":
            return "Setting up a home cinema night featuring films from different cultures, paired with themed snacks or meals.";
        default:
            return "A custom adventure blending our shared interests and desires, ensuring a memorable experience tailored just for us.";
    }
}


// function suggestCombinationDate(primary, secondary) {
//     console.log("P" +primary)
//     console.log("S "+secondary)
//     if (primary === "Adventure" && secondary === "Cozy") {
//         return "Plan a cozy cabin getaway where you can explore nearby trails during the day and relax by the fireplace at night.";
//     } else if (primary === "Cultural" && secondary === "Romantic") {
//         return "Attend a night at the opera or a symphony performance, followed by a late-night dessert café.";
//     } else if (primary === "Adventure" && secondary === "Cultural") {
//         return "Embark on a cultural scavenger hunt through the city, discovering hidden gems and historical landmarks.";
//     } else if (primary === "Cozy" && secondary === "Romantic") {
//         return "A night in, cooking a new recipe together followed by watching a classic romantic movie.";
//     } else if (primary === "Cultural" && secondary === "Cozy") {
//         return "A relaxed evening visiting a local bookstore or library event, then discussing your finds over coffee in a cozy café.";
//     } else if (primary === "Romantic" && secondary === "Adventure") {
//         return "A sunset sail or a hot air balloon ride, capped off with a picnic under the stars.";
//     } else if (primary === "Romantic" && secondary === "Cultural") {
//         return "A date night at a museum or gallery opening, followed by a romantic dinner at a restaurant with cultural significance.";
//     } else if (primary === "Adventure" && secondary === "Romantic") {
//         return "Planning a day trip to a nearby town or nature reserve, with a surprise romantic picnic or activity.";
//     } else if (primary === "Cozy" && secondary === "Cultural") {
//         return "Setting up a home cinema night featuring films from different cultures, paired with themed snacks or meals.";
//     } else {
//         return "A custom adventure blending our shared interests and desires, ensuring a memorable experience tailored just for us.";
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    showQuestion(questions[currentQuestionIndex]);
});
