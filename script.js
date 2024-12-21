document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const gallery = document.getElementById("gallery")

    //Function to fetch books
    const searchBooks = () => {
        const query = searchInput.value.trim();
        if(!query){
            alert("Please enter a search term");
            return;
        }

        fetch(`${API_URL}${query}`)
        .then((response) => response.json())
        .then((data) => {
            const books = data.items || [];
            displayBooks(books);
        })
        .catch((error) => console.error("Error fetching data:",error));
    };

    //Function to display books in the gallery
    const displayBooks = (books) => {
        gallery.innerHTML = "";

        if(books.length === 0){
            gallery.innerHTML = `<p> No Books Found </p>`;
            return;
        }

        books.forEach((book) => {
            let {title, imageLinks, infoLink } = book.volumeInfo;

            if(title.length > 20) {
                title = title.substring(0,20) + "...";
            }

            const card = document.createElement("div")
            card.className = "col-md-4";
            card.innerHTML = `
                <div class = "card">
                <img 
                    src = "${imageLinks ? imageLinks.thumbnail : "assets/placeholder.png"}"
                    class = "card-img-top"
                    alt = "${title}"
                />
                <div class ="card-body">
                    <h5 class = "card-title">${title} </h5>
                    <a href = "${infoLink}" class = "btn btn-primary" target = "_blank" rel = "noopener noreferrer"> View Details </a>
                </div>
                </div>
            `;
            gallery.appendChild(card);
        });
    };

    //Event Listners
    searchButton.addEventListener("click",searchBooks);
    searchInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            searchBooks();
        }
    });
});