let hadith = document.querySelector(`section p`),
  changeButton = document.querySelector(`section .change-button`),
  loveButton = document.querySelector(`section .love-button`),
  favListButton = document.querySelector(`header div`),
  favList = document.querySelector(`header .list`),
  favListCloseButton = document.querySelector(`header .close-button`);

let arrayOfHadiths = [];

changeBackground();

if (localStorage.getItem(`Hadiths`)) {
  arrayOfHadiths = JSON.parse(localStorage.getItem(`Hadiths`));
}

getFromLocalStorge();

fetch("https://api.hadith.gading.dev/books/bukhari?range=1-300")
  .then((x) => {
    return x.json();
  })
  .then((data) => {
    generateHadith(data);
    changeButton.onclick = () => {
      generateHadith(data);
      loveButton.classList.remove(`red`);
    };
  });

function generateHadith(data) {
  if (hadith.textContent.length < 2500) {
    hadith.innerHTML =
      data.data.hadiths[
        Math.floor(Math.random() * data.data.hadiths.length)
      ].arab;
  } else {
    hadith.innerHTML =
      data.data.hadiths[
        Math.floor(Math.random() * data.data.hadiths.length - 1)
      ];
  }
}

if (hadith.textContent.length > 1500) {
  hadith.style.fontSize = `15px`;
}

loveButton.onclick = function () {
  loveButton.classList.toggle(`red`);
  if (loveButton.classList.contains(`red`)) {
    addHadithsToArray(hadith.textContent);
    createHadtih(arrayOfHadiths);
  } else if (
    hadith.textContent ==
      favList.children[favList.children.length - 1].textContent &&
    !loveButton.classList.contains(`red`)
  ) {
    favList.children[favList.children.length - 1].remove();
    removeFromLocalStorage(hadith.textContent);
  }
};

favList.addEventListener(`click`, (e) => {
  if (e.target.classList.contains(`del`)) {
    e.target.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.getAttribute(`data-text`));
  } else if (e.target.classList.contains(`fa-x`)) {
    e.target.parentElement.parentElement.remove();
    removeFromLocalStorage(
      e.target.parentElement.parentElement.getAttribute(`data-text`)
    );
  }
});

favListButton.onclick = function () {
  favList.style.left = `-10px`;
  favListCloseButton.style.left = `240px`;
};

favListCloseButton.onclick = function () {
  favList.style.left = `-290px`;
  favListCloseButton.style.left = `-40px`;
};

function createHadtih(arrayOfHadiths) {
  favList.innerHTML = ``;
  arrayOfHadiths.forEach((hadith) => {
    let div = document.createElement(`div`);
    div.dataset.text = hadith.text;

    let deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`del`);

    let xIcon = document.createElement(`i`);
    xIcon.className = `fa fa-x`;

    deleteButton.appendChild(xIcon);
    div.appendChild(deleteButton);
    div.appendChild(document.createTextNode(hadith.text));
    favList.appendChild(div);
  });
}

function addHadithsToArray(hadithText) {
  let hadithObj = {
    text: hadithText,
  };
  arrayOfHadiths.push(hadithObj);
  addToLocalStorage(arrayOfHadiths);
}

function addToLocalStorage(arrayOfHadiths) {
  localStorage.setItem("Hadiths", JSON.stringify(arrayOfHadiths));
}

function getFromLocalStorge() {
  let data = localStorage.getItem("Hadiths");
  if (data) {
    let hadiths = JSON.parse(data);
    createHadtih(hadiths);
  }
}

function removeFromLocalStorage(text) {
  arrayOfHadiths = arrayOfHadiths.filter((hadith) => hadith.text != text);
  addToLocalStorage(arrayOfHadiths);
}

function changeBackground() {
  setInterval(() => {
    document.body.style.backgroundImage = `url(./imgs/img-${Math.ceil(
      Math.random() * 19
    )}.jpg)`;
  }, 10000);
}
