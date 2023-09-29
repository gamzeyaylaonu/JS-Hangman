//console.log("baglandı")

const word_element = document.getElementById("word");
//console.log(word_element)
const popup = document.getElementById("popup-container");
const message_element = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
//console.log(items)

const correctLetters = [];
const wrongLetters = [];
const selectedWord = getRandomWord();
let wrongAttemps = 0;

function getRandomWord() {
  const words = [
    "javascript",
    "java",
    "react",
    "html",
    "css",
    "git",
    "bootstrap",
  ];
  return words[Math.floor(Math.random() * words.length)];
}

//getRandomWord()

//console.log(getRandomWord())

function displayWord() {
  word_element.innerHTML = ` 
    ${selectedWord
      .split("")
      .map(
        (letter) => `
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </div>
    `
      )
      .join("")}`;

  const w = word_element.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    message_element.innerText = "Tebrikler 😎";
  }

  //console.log(word_element.innerText.replace(/\n/g,''))
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? "<h3>Yanlış Kelimeler</h3>" : " "}
    ${wrongLetters.map((letter) => `<span> ${letter} </span>`)}
    `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    //console.log(e.key);
    //console.log(e.keyCode);
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        //console.log('bu harfi zaten eklediniz')
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        //console.log('hatalı harfleri güncelle');
        updateWrongLetters();
      }
    }
  }
});
function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? "<h3>Yanlış Harfler</h3>" : " "}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongLetters.length === 7) {
    popup.style.display = "flex";
    message_element.innerText = `Kaybettin! Kelime şuydu: "${selectedWord}" 😢`;
  }
}
window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      }
    }
  }
});

displayWord();
