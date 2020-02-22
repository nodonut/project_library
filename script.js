const checkReadStatus = document.querySelector('input[type = "checkbox"]');

checkReadStatus.addEventListener('click', e => {
  e.target.setAttribute('class', 'checked');
});

const submitButton = document.querySelector('button[type="submit"]');
const bookTitle = document.querySelector('input[id="book_title"]');
const bookAuthor = document.querySelector('input[id="book_author"]');
const bookRead = document.querySelector('input[id="book_read"]');
const bookBody = document.querySelector('.book-body');
submitButton.addEventListener('click', () => {
  // const book_title = bookTitle.value;
  // bookBody.innerHTML +=
  if (bookRead.classList.contains('checked')) {
    const book = new Book(bookTitle.value, bookAuthor.value, bookRead.value);
    addBookToLibrary(book);

    myLibrary.forEach(item => {
      let book_title = item.title;
      let book_author = item.author;
      bookBody.innerHTML += `<tr>
    <td>${book_title}</td>
    <td>${book_author}</td>
    <td>
      <form action="#">
        <label> <input type="checkbox" checked="checked"/><span></span></label>
      </form>
    </td>
  </tr>`;
    });
  } else {
    const book = new Book(bookTitle.value, bookAuthor.value, bookRead.value);
    addBookToLibrary(book);

    myLibrary.forEach(item => {
      let book_title = item.title;
      let book_author = item.author;
      bookBody.innerHTML += `<tr>
    <td>${book_title}</td>
    <td>${book_author}</td>
    <td>
      <form action="#">
        <label> <input type="checkbox" /><span></span></label>
      </form>
    </td>
  </tr>`;
    });
  }
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
