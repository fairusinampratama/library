let modal = document.getElementById("modal");
let btn = document.getElementById("addBook");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.querySelector('.card-book');
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('card-container');

    bookContainer.innerHTML = `
      <div class="card-title">${book.title}</div>
      <div class="card-author">${book.author}</div>
      <div class="card-page">${book.pages} Pages</div>
      <div class="card-status">
        <div class="${book.read ? 'read' : 'not-read'}" 
             onclick="toggleReadStatus(${index})">
          ${book.read ? 'Read' : 'Not Read'}
        </div>
      </div>
      <div class="card-remove">
        <div class="remove" onclick="removeBook(${index})">Remove</div>
      </div>
    `;

    libraryContainer.appendChild(bookContainer);
  });
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('card-title-add').value;
  const author = document.getElementById('card-author-add').value;
  const pages = document.getElementById('card-pages-add').value;
  const read = document.getElementById('card-status-add').checked;

  addBookToLibrary(title, author, pages, read);
  closeModal();
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

document.getElementById('addBook').addEventListener('click', openModal);

document.querySelector('.form-add').addEventListener('submit', handleFormSubmit);

document.querySelector('.close').addEventListener('click', closeModal);

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

addBookToLibrary('Naruto', 'M. Kishimoto', 295, true);
