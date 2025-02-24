const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const buttonForm = document.getElementById("button-form");
const bookReadTotal = document.getElementById("book-read-total");
const bookUnreadTotal = document.getElementById("book-unread-total");
const bookTotal = document.getElementById("book-total");
const buttonDeleteAll = document.getElementById("button-delete-all");

let library = [
    new Book("One Piece", "Eiichiro Oda", 1050, true),
    new Book("Attack on Titan", "Hajime Isayama", 139, false),
    new Book("Naruto", "Masashi Kishimoto", 700, true),
    new Book("Death Note", "Tsugumi Ohba", 108, false),
    new Book("Demon Slayer", "Koyoharu Gotouge", 205, true),
    new Book("Fullmetal Alchemist", "Hiromu Arakawa", 116, true),
    new Book("Hunter x Hunter", "Yoshihiro Togashi", 400, false),
    new Book("Bleach", "Tite Kubo", 686, true),
    new Book("Jujutsu Kaisen", "Gege Akutami", 249, false)
  ];
  

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const updateTotals = () => {
  bookReadTotal.textContent = library.filter(
    (book) => book.read === true
  ).length;
  bookUnreadTotal.textContent = library.filter(
    (book) => book.read === false
  ).length;
  bookTotal.textContent = library.length;
};

const displayBooks = () => {
  if (!library.length) {
    bookList.innerHTML =
      "<tr><td colspan='5' style='text-align:center;'>No books available</td></tr>";
    updateTotals();
    return;
  }

  bookList.innerHTML = library
    .map(
      (book, index) => `
  <tr>
    <td>
        ${book.title}
    </td>
    <td>
        ${book.author}
    </td>
    <td>
        ${book.pages}
    </td>
    <td>
        <span class="material-symbols-outlined read ${
          book.read ? "check" : "close"
        }" data-index="${index}">${book.read ? "check" : "close"}</span>
    </td>
    <td>
        <span class="material-symbols-outlined delete" data-index="${index}">delete</span>
    </td>
  </tr>
  `
    )
    .join("");
  updateTotals();
};

const addBook = () => {
  const formData = new FormData(bookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read") === "on" ? true : false;
  library.push(new Book(title, author, pages, read));
  bookForm.reset();
  displayBooks();
};

const removeBook = (index) => {
  library.splice(index, 1);
};

const toogleReadStatus = (index) => {
  library[index].read = !library[index].read;
};

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBook();
});

bookList.addEventListener("click", (event) => {
  const index = Number(event.target.getAttribute("data-index"));
  if (event.target.classList.contains("delete")) removeBook(index);
  if (event.target.classList.contains("read")) toogleReadStatus(index);
  displayBooks();
});

buttonDeleteAll.addEventListener("click", () => {
  library = [];
  displayBooks();
});

displayBooks();
