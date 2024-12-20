const result = document.getElementById('result-btn')
const checkBtn = document.getElementById('check-btn');
const resetBtn = document.getElementById('reset-btn');
const check = document.getElementById('correct-answers-table');

const correctAnswers = {
    "blue-a": "No effect ",
    "red-a": "No effect ",
    "type-a": "Neutral",
    "blue-b": "Turns to pink",
    "red-b": "No effect ",
    "type-b": "Acidic",
    "blue-c": "Turns to pink",
    "red-c": "No effect ",
    "type-c": "Acidic",
    "blue-d": "No effect ",
    "red-d": "Turns to blue ",
    "type-d": "Alkaline",
    "blue-e": "No effect ",
    "red-e": "Turns to blue",
    "type-e": "Alkaline",
    "blue-f": "No effect ",
    "red-f": "Turns to blue",
    "type-f": "Alkaline",
    "blue-g": "Turns to red",
    "red-g": "No effect ",
    "type-g": "Acidic",
};
const litmusPapers = document.querySelectorAll('.papers .redlitmus, .papers .bluelitmus');
const beakers = document.querySelectorAll('.beaker');
let draggedItem = null;
let originalPosition = null;

litmusPapers.forEach(paper => {
    paper.addEventListener('dragstart', event => {
        draggedItem = paper;
        originalPosition = { x: paper.offsetLeft, y: paper.offsetTop }; // Save original position
        setTimeout(() => {
            paper.style.opacity = '0'; // Make it disappear temporarily while dragging
        }, 0);
    });

    paper.addEventListener('dragend', () => {
        paper.style.opacity = '1'; // Restore visibility when drag ends
    });
});

beakers.forEach(beaker => {
    beaker.addEventListener('dragover', event => {
        event.preventDefault(); // Allow dropping
    });

    beaker.addEventListener('drop', () => {
        const type = beaker.dataset.type; // Beaker type (acidic, alkaline, neutral)
        const beakerId = beaker.dataset.id.toLowerCase(); // Beaker ID 
        const draggedImg = draggedItem.querySelector('img');
        const originalImageSrc = draggedImg.src;
        let newImageSrc = originalImageSrc;

        // Change image source based on conditions
        if (draggedImg.src.includes('Red_Litmus.png') && type === 'acidic' && beakerId === 'g') {
            newImageSrc = './images/Red_Litmus.png';
        } else if (draggedImg.src.includes('Blue_litmus.png') && type === 'acidic' && beakerId === 'g') {
            newImageSrc = './images/Blue_to_red_Litmus.png'; // Change this line to turn blue litmus red in acid beaker with ID 'g'
        } else if (draggedImg.src.includes('Blue_litmus.png') && type === 'acidic') {
            newImageSrc = './images/Blue_to_pink_Litmus.png';
        } else if (draggedImg.src.includes('Red_Litmus.png') && type === 'alkaline') {
            newImageSrc = './images/Red_to_blue_Litmus.png';
        }
        

        // Move the dragged item to the top of the beaker
        const beakerRect = beaker.getBoundingClientRect();
        const containerRect = beaker.closest('.container').getBoundingClientRect();

        draggedItem.style.position = 'absolute';
        draggedItem.style.left = `${beakerRect.left - containerRect.left + beakerRect.width / 2 - draggedItem.offsetWidth / 2}px`;
        draggedItem.style.top = `${beakerRect.top - containerRect.top - draggedItem.offsetHeight / 2}px`;
        draggedImg.src = newImageSrc;

        setTimeout(() => {
            draggedImg.src = originalImageSrc; // Reset image source
            draggedItem.style.position = ''; // Clear absolute positioning
            draggedItem.style.left = ''; // Clear left position
            draggedItem.style.top = ''; // Clear top position
        }, 2000);
    });
});

checkBtn.addEventListener("click", () => {
    const selects = document.querySelectorAll("select");
    result.style.display = 'block';
    resetBtn.style.display = 'block';
    selects.forEach((select) => {
        const id = select.id;
        const userAnswer = select.value.trim();
        const correctAnswer = correctAnswers[id].trim();

        if (userAnswer === "SELECT") {
            select.style.border = "2px solid orange"; // Unselected option
        } else if (userAnswer === correctAnswer) {
            select.style.border = "2px solid green"; // Correct answer
        } else {
            select.style.border = "2px solid red"; // Incorrect answer
        }
    });
});
result.addEventListener('click',()=>{
    check.style.display = 'block';
    resetBtn.style.display = 'block';
    result.style.display = 'none';
    check.scrollIntoView({ behavior: "smooth" });
})
// Reset button functionality
resetBtn.addEventListener("click", () => {
        resetBtn.style.display = 'none';
    check.style.display = "none";
    result.style.display = 'none';
        const selects = document.querySelectorAll("select");
        selects.forEach((select) => {
            select.style.border = "1px solid #ccc"; // Reset border style
            select.value = "SELECT"; // Reset dropdown
        });
    });

