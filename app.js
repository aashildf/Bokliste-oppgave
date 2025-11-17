
// SAVE TO LOCALSTORAGE

function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}


// DOM-ELEMENTS

const form = document.getElementById("book-form");
const list = document.getElementById("book-list");
const filterGenre = document.getElementById("filter-genre");
const sortBy = document.getElementById("sort-by");
const viewMode = document.getElementById("view-mode");
const clearAllBtn = document.getElementById("clear-storage");
const searchInput = document.getElementById("search"); 


// ADD GENRE

function populateGenres() {
  const books = getBooks();
  const genres = [...new Set(books.map(b => b.genre).filter(g => g))];
  filterGenre.innerHTML = `<option value="">Alle</option>`;
  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g;
    filterGenre.appendChild(option);
  });
}


// EVENT LISTENERS

searchInput.addEventListener("input", renderBooks); 
filterGenre.addEventListener("change", renderBooks);
sortBy.addEventListener("change", renderBooks);
viewMode.addEventListener("change", renderBooks);
clearAllBtn.addEventListener("click", () => {
  if (confirm("Slette alle bøker?")) {
    localStorage.removeItem("books");
    renderBooks();
  }
});

// DELETE BOOK -FAVORIT-TOGGLE

list.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  // FAVORIT
  if (e.target.classList.contains("star")) {
    const updated = getBooks().map(b => {
      if (b.id === id) b.favorite = !b.favorite;
      return b;
    });
    saveBooks(updated);
    renderBooks();
  }

  // DELETE
  if (e.target.classList.contains("delete")) {
    const books = getBooks().filter(b => b.id !== id);
    saveBooks(books);
    renderBooks();
  }
});



// FUNCTION STATISTICS

function renderStats(books) {
  const totalBooks = books.length;
  document.getElementById("total-books").textContent = `Totalt: ${totalBooks}`;

  const totalPages = books.reduce((sum, b) => sum + Number(b.pages || 0), 0);
  document.getElementById("total-pages").textContent = `Totalt sider: ${totalPages}`;

  const byGenre = books.reduce((acc, b) => {
    if (!b.genre) return acc;
    acc[b.genre] = (acc[b.genre] || 0) + 1;
    return acc;
  }, {});

  const genreText = Object.entries(byGenre)
    .map(([g, n]) => `${g}: ${n}`)
    .join(", ") || "—";

  document.getElementById("books-per-genre").textContent = `Bøker per sjanger: ${genreText}`;
}



// RENDER BOOKS

function renderBooks() {
  let books = getBooks();

  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query)
    );
  }

  // Filter by genre
  const selectedGenre = filterGenre.value;
  if (selectedGenre && selectedGenre !== "all") {
    books = books.filter((b) => b.genre === selectedGenre);
  }

  // Filter favorites
  if (viewMode.value === "favorites") {
    books = books.filter((b) => b.favorite);
  }

  // Sorting
  if (sortBy.value === "title") {
    books.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === "pages") {
    books.sort((a, b) => Number(a.pages) - Number(b.pages));
  } else if (sortBy.value === "author") {
    books.sort((a, b) => a.author.localeCompare(b.author));
  } else if (sortBy.value === "favorite") {
    // Favoritter først
    books.sort((a, b) => {
      return (b.favorite === true) - (a.favorite === true);
    });
  }

  // empty table
  list.innerHTML = "";

  // add books
  books.forEach((book) => {
    const { id, favorite, title, author, genre, pages } = book;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><span class="star ${
      favorite ? "favorite" : ""
    }" data-id="${id}">★</span></td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.pages}</td>
      <td><a href="#" class="delete" data-id="${book.id}">x</a></td>
    `;
    list.appendChild(row);
  });
  
  // UPDATE STATS.
  
  renderStats(books);
}

// ADD BOOK

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const pages = document.getElementById("pages").value.trim();

  if (!title || !author || !pages) {
    alert("Fyll inn alle feltene!");
    return;
  }

  const books = getBooks();

  const newBook = {
    id: crypto.randomUUID(),
    title,
    author,
    genre,
    pages,
    favorite: false,
  };

  books.push(newBook);
  saveBooks(books);

  renderBooks();
  form.reset();
});


// DELETE BOOK

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    const books = getBooks().filter((b) => b.id !== id);
    saveBooks(books);
    renderBooks();
  }
});


// FILTER AND SORT

filterGenre.addEventListener("change", renderBooks);
sortBy.addEventListener("change", renderBooks);

// DELETE ALL

clearAllBtn.addEventListener("click", () => {
  if (confirm("Slette alle bøker?")) {
    localStorage.removeItem("books");
    renderBooks();
  }
});

// -----------------------------
// INITIAL RENDER
// -----------------------------

populateGenres();
renderBooks();
