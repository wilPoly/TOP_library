const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// fixed --> for..in va énumérer TOUTES les propriétés énumérables de l'objet
// tester si les propriétés sont celles propres à l'objet (et donc éviter celles hérités du prototype)
Book.prototype.toggleReadStatus = function() {
  if (this.read) {
    this.read = false;
  }
  else {
    this.read = true;
  }
}

myLibrary.push(new Book("The Gunslinger", "Stephen King", "288", true));
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", "500", true));


function addBookToLibrary() {
  const addBookButton = document.getElementById("add-book");
  const dialog = document.getElementById("dialog");
  const createBook = document.getElementById("create-book");
  const close = document.getElementById("close");
  const bookInfo = dialog.querySelectorAll("input");
  let title, author, pages, read;

  addBookButton.addEventListener("click", (e) => {
    dialog.showModal();
  });

  createBook.addEventListener("click", (e) => {
    e.preventDefault();
    // parse bookInfo and assign each entry to the object
    bookInfo.forEach((book) => {
      switch (book.name) {
        case "title":
          title = book.value;
          break;
        case "author":
          author = book.value;
          break;
        case "pages":
          pages = book.value;
          break;
        case "read":
          read = book.checked;
        default:
          break;
      }
    });
    // create the book object
  myLibrary.push(new Book(title, author, pages, read));
  dialog.close();
  updateList();
  });

  close.addEventListener("click", (e) => {
    dialog.close();
  })
}

function displayBooks() {
  // loop through myLibrary
  let wrapper = document.createElement("div");
  wrapper.id = "wrapper";
  document.body.appendChild(wrapper);

  // Book Cards
  for (let index = 0; index < myLibrary.length; index++) {
    let book = myLibrary[index];
    let bookCard = document.createElement("div")
    bookCard.setAttribute("data-id", `${index}`);
    bookCard.classList.add("book-card");
    wrapper.appendChild(bookCard);

    for (let key in book) {
      if (book.hasOwnProperty(key)){
        let newBookItem = document.createElement("div");
        newBookItem.classList.add("book-item");
        newBookItem.textContent = book[key];
        bookCard.appendChild(newBookItem);
      }
    }

    const toggleButton = document.createElement("button");
    bookCard.appendChild(toggleButton);
    toggleButton.textContent = `${book.read ? "Read it!" : "Not read yet!"}`;
    toggleButton.addEventListener('click', (e) => {
      book.toggleReadStatus();
      toggleButton.textContent = `${book.read ? "Read it!" : "Not read yet!"}`;
      console.log(`Book read? ${book.read}`);
    });

    // Remove button
    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove book";
    bookCard.appendChild(removeBookButton);
    removeBookButton.addEventListener('click', (e) => {
      removeBook(bookCard.getAttribute("data-id"));
    });
  }
}

function removeBook(index) {
  let bookCard = document.querySelector(`.book-card[data-id="${index.toString()}"]`);
  myLibrary.splice(index, 1);
  bookCard.remove();
  console.log(myLibrary);
  updateList();
}

function updateList() {
  document.getElementById("wrapper").remove();
  displayBooks();
}

displayBooks();
addBookToLibrary();
