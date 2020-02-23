// const checkReadStatus = document.querySelector('input[type = "checkbox"]');

const submitButton = document.querySelector('button[type="submit"]');
const bookTitle = document.querySelector('input[id="book_title"]');
const bookAuthor = document.querySelector('input[id="book_author"]');
const bookRead = document.querySelector('input[id="book_read"]');
const bookBody = document.querySelector('.book-body');

bookReadCounter = 0;

bookRead.addEventListener('click', e => {
  if (e.target.classList.contains('checked')) {
    e.target.classList = '';
    bookReadCounter = 0;
  } else {
    e.target.classList = 'checked';
    bookReadCounter = 1;
  }
});

submitButton.addEventListener('click', () => {
  const book = new Book(bookTitle.value, bookAuthor.value, bookReadCounter);
  addBookToLibrary(book);
  clearTable();
  render();
  console.log(book);
});

let myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render() {
  myLibrary.forEach(item => {
    let book_title = item.title;
    let book_author = item.author;
    let book_read = item.read;

    if (book_read == 1) {
      bookBody.innerHTML += `<tr>
      <td>${book_title}</td>
      <td>${book_author}</td>
      <td>
      <form action="#">
        <label> <input type="checkbox" checked="checked"/><span></span></label>
      </form>
    </td>
  </tr>`;
    } else {
      bookBody.innerHTML += `<tr>
      <td>${book_title}</td>
      <td>${book_author}</td>
      <td>
      <form action="#">
        <label> <input type="checkbox"/><span></span></label>
      </form>
    </td>
  </tr>`;
    }
  });
}

function clearTable() {
  bookBody.innerHTML = ``;
}
