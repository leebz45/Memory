
// Support for up to 24 cards (12 matches)
let icons = ["fa-dragon", "fa-otter", "fa-kiwi-bird", "fa-dove", "fa-crow", "fa-horse", "fa-frog", "fa-fish", "fa-cat", "fa-spider",
    "fa-dog", "fa-hippo"];
let numMatches = 8;
// Slice the icons array to the number of matches we have
icons = icons.slice(0, numMatches);
// Duplicate the array and combine it with the original so it will match the number of cards
const dupIcons = [...icons];
icons = icons.concat(dupIcons);
var timer = null;
var firstFlip = null;
var gameover = false;

function shuffle(arr) {

    // Shuffle 50 times
    for (let i = 0; i < 50; i++) {
        // Fisher–Yates shuffle Algorithm
        // Start from the last element and swap
        // one by one. We don't need to run for
        // the first element that's why i > 0
        for (let i = arr.length - 1; i > 0; i--) {
            let j = (Math.floor(Math.random() * i));

            // Swap arr[i] with the element
            // at random index
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    return arr;
}

function addCards() {
    let count = 0;
    const randomIcons = shuffle(icons);
    for (let i = 0; i < 2; i++) {
        let container = document.createElement("div");
        container.classList.add("container");
        document.getElementById("main").appendChild(container);
        for (let j = 0; j < 8; j++) {
            // Card Container
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");

            // Card Wrapper
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = count;
            card.addEventListener("click", turnCard);

            // Front of card
            const front = document.createElement("div");
            front.classList.add("front");
            // front.classList.add(rowIcons[count]);
            let icon = document.createElement("i");
            icon.classList.add("fas", randomIcons[count], "fa-4x", "fa-fw", "cardIcon")
            front.appendChild(icon);

            // Back of card
            const back = document.createElement("div");
            back.classList.add("back");
            icon = document.createElement("i");
            icon.classList.add("fas", "fa-brain", "fa-4x", "fa-fw", "cardIcon");
            back.appendChild(icon);

            card.appendChild(front);
            card.appendChild(back);
            cardContainer.appendChild(card);
            container.appendChild(cardContainer);

            count++;
        }
    }
}

function turnCard() {

    if (this.classList.contains("flipped")) {
        return;
    } else {
        this.classList.toggle("flipped");
    }

    if (!firstFlip) {
        firstFlip = this;
        return;
    } else if (firstFlip.children[0].children[0].classList[1] !== this.children[0].children[0].classList[1]) {
        // Animate flipping cards back over if not a match
        setTimeout(function (first, second) {
            first.classList.toggle("flipped");
            second.classList.toggle("flipped");
        }, 1 * 1000, firstFlip, this);
    } else checkGamover();

    firstFlip = null;
}

function checkGamover() {
    // Loop through elements of class card. As soon as we find one that's not flipped the game isn't over. 
    let cards = document.getElementsByClassName("card");
    for (let card of cards) {
        if (!card.classList.contains("flipped")) {
            return;
        }
    }
    gameOver();
}

function gameOver() {
    let cards = document.getElementsByClassName("card");

    clearInterval(timer);

    for (let card of cards) {
        card.removeEventListener("click", turnCard);
    }
    gameover = true;
}

function start() {
    timer = setInterval(function () {
        let timeMin = document.getElementById("minutes");
        let timeSec = document.getElementById("seconds");
        let s = parseInt(timeSec.textContent);
        let m = parseInt(timeMin.textContent);

        s++;
        if (s >= 60) {
            s = 0;
            m++;
        }
        if (m > 9) {
            gameOver();
        }

        timeMin.textContent = m.toString().padStart(2, "0");
        timeSec.textContent = s.toString().padStart(2, "0");

    }, 1000)
}

addCards();
start();