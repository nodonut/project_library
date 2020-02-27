// Book Object

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

// The Library Array

const myLibrary = [];

// Defining function to add the book to library

function addToLibrary(book) {
  myLibrary.push(book);
}

// Update Counter
let bookReadCounter = 0;

const bookRead = document.querySelector('.book_read');
bookRead.addEventListener('click', e => {
  if (e.target.classList.contains('checked')) {
    e.target.classList = '';
    bookReadCounter = 0;
  } else {
    e.target.classList = ' checked';
    bookReadCounter = 1;
  }
});

const submitButton = document.getElementById('submit_button');

submitButton.addEventListener('click', () => {
  const bookTitle = document.getElementById('book_title').value;
  const bookAuthor = document.getElementById('book_author').value;

  if (bookTitle == '' || bookAuthor == '') {
    alert('please add title and author');
  } else {
    const book = new Book(bookTitle, bookAuthor, bookReadCounter);

    clearBooksTable();
    addToLibrary(book);
    render();
    const inputRead = document.querySelector('#read');
    inputRead.addEventListener('click', e => {
      bookName =
        e.target.parentElement.parentElement.parentElement.parentElement
          .children[0].textContent;

      myLibrary.forEach(book => {
        if (book.title == bookName) {
          if (book.read == 0) {
            book.read = 1;
          } else {
            book.read = 0;
          }
        }
      });
    });
  }
});

// Display books

function render() {
  const showcase = document.querySelector('.showcase');

  myLibrary.forEach(book => {
    const row = document.createElement('tr');
    if (book.read == 1) {
      row.innerHTML += `
    <td id="bookTitle">${book.title}</td>
    <td>${book.author}</td>
    <td id="bookReadCount"><form>
      <label>
        <input type="checkbox" checked="checked" id="read"/><span></span>
      </label>
    </form></td>
    <td><i class="fa fa-trash remove"></i></td>
    `;

      showcase.appendChild(row);
    } else {
      row.innerHTML += `
    <td id="bookTitle">${book.title}</td>
    <td>${book.author}</td>
    <td><form>
      <label>
        <input type="checkbox" /><span></span>
      </label>
    </form></td>
    <td><i class="fa fa-trash remove"></i></td>
    `;

      showcase.appendChild(row);
    }
  });
  removeBooks();
}

function clearBooksTable() {
  document.querySelector('.showcase').innerHTML = ``;
}

// Removing books from array

function removeBooks() {
  const removeButton = document.querySelectorAll('.remove');
  removeButton.forEach(button => {
    button.addEventListener('click', e => {
      const trEl = e.target.parentElement.parentElement;
      trEl.classList = 'delete';
      const bookTitle = document.getElementById('bookTitle').textContent;
      removeFromLib(bookTitle);
      removeBook(trEl);
    });
  });
  function removeBook(el) {
    const showcase = document.querySelector('.showcase');

    if (el.classList.contains('delete')) {
      showcase.removeChild(el);
    }
  }
  function removeFromLib(bookInfo) {
    myLibrary.forEach(book => {
      if (book.title == bookInfo) {
        myLibrary.pop(book);
      }
    });
  }
}

// Books read/unread state
function updateBook(bookArray) {
  bookArray.forEach(book => {
    if (book.read == 0) {
      book.read = 1;
    }
  });
}

Book.prototype.toggleRead = function() {
  if (this.read == 1) {
    this.read = 0;
  }
};
