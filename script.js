//your code here
const images = document.querySelectorAll("img");
const h3 = document.createElement("h3");
h3.id = "h";
h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
document.querySelector("main").appendChild(h3);

let clickedImages = [];
let verifyButtonClicked = false;

// Shuffle the images
const shuffledImages = Array.from(images).sort(() => Math.random() - 0.5);

shuffledImages.forEach((image, index) => {
  image.classList.add(`img${index + 1}`);
  image.addEventListener("click", () => handleImageClick(image));
});

const resetButton = document.createElement("button");
resetButton.id = "reset";
resetButton.textContent = "Reset";
resetButton.style.display = "none";
resetButton.addEventListener("click", () => resetState());

const verifyButton = document.createElement("button");
verifyButton.id = "verify";
verifyButton.textContent = "Verify";
verifyButton.style.display = "none";
verifyButton.addEventListener("click", () => verify());

document.querySelector("main").appendChild(resetButton);
document.querySelector("main").appendChild(verifyButton);

function handleImageClick(image) {
  if (!verifyButtonClicked) {
    image.classList.toggle("selected");
    clickedImages.push(image);
    
    if (clickedImages.length === 2) {
      verifyButton.style.display = "block";
    }
    
    if (clickedImages.length > 2) {
      verifyButton.style.display = "none";
    }
  }
}

function resetState() {
  clickedImages.forEach(image => image.classList.remove("selected"));
  clickedImages = [];
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  verifyButtonClicked = false;
  h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
}

function verify() {
  verifyButtonClicked = true;
  
  if (clickedImages.length === 2 && clickedImages[0].classList[1] === clickedImages[1].classList[1]) {
    h3.textContent = "You are a human. Congratulations!";
  } else {
    h3.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  
  verifyButton.style.display = "none";
  resetButton.style.display = "block";
}

