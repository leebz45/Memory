let colors = ["red", "orange", "yellow", "green", "blue", "violet", "indigo", "magenta"];
const dupColors = [...colors];
colors = colors.concat(dupColors);
var firstFlip = null;

function shuffle(arr) {
    // Fisher–Yates shuffle Algorithm

    // Shuffle 50 times
    for (let i = 0; i < 50; i++) {
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
    const rowColors = shuffle(colors);
    for (let i = 0; i < 2; i++) {
        let container = document.createElement("div");
        container.classList.add("container");
        document.body.appendChild(container);
        for (let j = 0; j < 8; j++) {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");

            const card = document.createElement("div");
            card.classList.add("card");
            card.id = count;
            card.onclick = turnCard;
            const front = document.createElement("div");
            front.classList.add("front");
            front.classList.add(rowColors[count]);

            const back = document.createElement("div");
            back.classList.add("back");

            card.appendChild(front);
            card.appendChild(back);
            cardContainer.appendChild(card);
            container.appendChild(cardContainer);
            
            count++;
        }
    }
}

function turnCard(e) {
    let flip = document.getElementById(e.target.parentElement.id)
    if (flip.classList.contains("flipped")) {
        return;
    } else {
        flip.classList.toggle("flipped");
    }

    if (!firstFlip) {
        firstFlip = flip;
        return;
    } else if (firstFlip.children[0].classList[1] !== flip.children[0].classList[1]) {
        setTimeout(function (el) {
            el.classList.toggle("flipped");
            flip.classList.toggle("flipped");
        }, 2 * 1000, firstFlip);
    }
    firstFlip = null;
}

addCards();