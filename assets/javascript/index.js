$(document).ready(() => {
  hamburgerDropDown();
});

const hamburgerDropDown = () => {
  const toggleActive = () => {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  };

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(toggleActive);
};

// Get book card from API
const getBookCardsData = (books) => {
  const callback = (bookItem) => {
    return {
      title: bookItem.volumeInfo.title,
      description: bookItem.volumeInfo.description,
      img: bookItem.volumeInfo.imageLinks.smallThumbnail,
    };
  };
  return books.items.slice(0, 6).map(callback);
};

const getBookData = async (bookName) => {
  const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;
  const bookDataResponse = await fetch(bookUrl);
  const bookData = await bookDataResponse.json();

  const bookCard = getBookCardsData(bookData);

  console.log(bookCard);
};

getBookData("harry potter");

// Save books into Local Storage
const setBooksInLS = function (bookName) {
  // get books from LS
  const book = JSON.parse(localStorage.getItem("recentBook")) ?? [];

  // if book does not exist
  if (!book.includes(bookName)) {
    // insert bookName in book
    book.push(bookName);

    // set book in LS
    localStorage.setItem("recentBook", JSON.stringify(book));
  }
};

const renderRecentBook = () {}
const renderBookInfo = () {}


const handleReady = function () {
  // render recent books
  renderRecentBook();

  // Get book from LS
  const book = JSON.parse(localStorage.getItem("recentBook")) ?? [];

  // if there are recent book get the info for the most recent book
  if (book.length) {
    const bookName = book[book.length - 1];
    renderBookInfo(bookName);
  }
};

$("#search-form").on("submit", handleSearch);
$(document).ready(handleReady);
