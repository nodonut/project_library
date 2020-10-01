const bookName = document.getElementById('name'),
  bookAuthor = document.getElementById('author'),
  readBool = document.getElementById('read'),
  submitBtn = document.getElementById('submit'),
  books = document.querySelector('.books');

// Book Object
function Book(name, author, read) {
  this.name = name;
  this.author = author;
  this.read = read;
}

// Array to store our books
const myLibrary = [];

// Checking if local storage contains any books we need to load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('books') !== null) {
    displayBooks(JSON.parse(localStorage.getItem('books')));
  }
});

// Function to display books
function displayBooks(arr) {
  // So, if I don't do this then the function keeps adding more books to the Document Object Model(DOM).
  // This could be done in an another way.
  books.innerHTML = '';

  // Iterating through the myLibrary array which has been passed as an argument
  arr.forEach((book) => {
    // Destructuring to get the properties from the book object
    const { name, author, read } = book;

    // Creating a div for the book
    const bookDiv = document.createElement('div');

    // Add book class for styling
    bookDiv.classList.add('book');

    // This is important. I use this attribute to confirm the book which is being updated or deleted
    bookDiv.setAttribute('data-bookID', myLibrary.indexOf(book));

    // Here i'm inserting/injecting HTML directly into the page using DOM Manipulation
    // This can be done differently, but since this isn't a big project this method works fine
    bookDiv.innerHTML = `
      <div id="book-name">${name}</div>
      <div id="book-author">${author}</div>
      <div id="read-toggle"><input type="checkbox" id="toggle" ${
        read ? 'checked' : ''
      }></div>
      <div id="remove-btn"><i class="fa fa-trash"></i></div>
    `;

    // Adding the book to the DOM
    books.appendChild(bookDiv);

    // Need to run this function here since remove-btn is also created when the display function runs
    deleteBook();

    // Same reason as deleteBook function
    updateBook();
  });
}

// Function to clear fields after clicking submit button
function clearFields() {
  // Grab all the fields and set them empty. Nothing fancy.
  bookName.value = '';
  bookAuthor.value = '';
  readBool.checked = false;
}

// An event listener on the submit button which triggers the addBookToLibrary function
submitBtn.addEventListener('click', () => {
  // Confirm field are not empty
  if (bookName.value === '' || bookAuthor.value === '') {
    alert("Please enter the book and author's name");
  } else {
    // I could have made a separate function to do this
    // But since this isn't a big project this works fine
    let book = new Book(bookName.value, bookAuthor.value, readBool.checked);
    myLibrary.push(book);

    // Adding books to local storage
    localStorage.setItem('books', JSON.stringify(myLibrary));
    clearFields();

    // This can be done in a better way
    // I retrieve the array from the localstorage and send it straight to displayBook function
    displayBooks(JSON.parse(localStorage.getItem('books')));
  }
});

// Search for the book in myLibrary and delete it
function deleteBook() {
  // Grab all instances of the remove buttons
  const deleteBtns = document.querySelectorAll('#remove-btn');

  // Iterate through all the buttons
  deleteBtns.forEach((btn) => {
    // Use the addEventListener on each button
    btn.addEventListener('click', (e) => {
      // To be sure which book we are deleting, we grab the bookID which we implemented when
      // I used the displayBooks function
      let bookTitle = e.target.parentElement.parentElement.getAttribute(
        'data-bookID'
      );

      // Okay so this thing of checking of book name is because i didn't add a unique ID to each book
      // Which you should do if you are making your own library
      // I'm sorry this was hacked together
      // Here we grab the name of the book using DOM Manipulation
      let bookName =
        e.target.parentElement.parentElement.firstElementChild.textContent;

      // Then we get the array from local storage
      const localBookStr = JSON.parse(localStorage.getItem('books'));

      // Iterate through the array and remove the book if it meets the condition
      localBookStr.forEach((book, index) => {
        if (book.name === bookName) {
          localBookStr.splice(index, 1);
        }
      });

      // Then add the new array to localstorage
      localStorage.setItem('books', JSON.stringify(localBookStr));

      // The argument could have been shorter. Yes
      // I removed the element from the Document Object Model(DOM).
      books.removeChild(e.target.parentElement.parentElement);

      // To remove the book from the array I used the splice method.
      // Since a book can be removed from any place in the array, splice is most appropriate.
      myLibrary.splice(bookTitle, 1);
    });
  });
}

// Update read prop function
function updateBook() {
  // The only time we grab something inside a function
  // Could've done so at the start
  const bookToggle = document.querySelectorAll('#toggle');

  // Since we grabbed a NODE list, meaning all instances, we need to iterate through each checkbox
  bookToggle.forEach((box) => {
    box.addEventListener('change', (e) => {
      // We need to grab the book div and it's bookID that we set
      let bookIndex = e.target.parentElement.parentElement.getAttribute(
        'data-bookID'
      );

      // Same process as deleting books
      // Grab the name
      // Retrieve array
      // Iterate through array
      // If it matches, we update the read value
      let bookName =
        e.target.parentElement.parentElement.firstElementChild.textContent;

      const localBookStr = JSON.parse(localStorage.getItem('books'));
      localBookStr.forEach((book, index) => {
        if (book.name === bookName) {
          switch (book.read) {
            case true:
              book.read = false;
              break;
            case false:
              book.read = true;
            default:
              break;
          }
        }
      });
      localStorage.setItem('books', JSON.stringify(localBookStr));

      // Once we have the bookID we can check its current status with an IF-Else IF
      // This can be done using Switch statements, which would be much cleaner
      if (myLibrary[bookIndex].read === false) {
        myLibrary[bookIndex].read = true;
      } else if (myLibrary[bookIndex].read === true) {
        myLibrary[bookIndex].read = false;
      }
    });
  });
}
