let books = [
    {
        "id": "1",
        "title": "Harry Potter and the Philosopher's Stone",
        "isAvailable": true
    }, {
        "id": "2",
        "title": "Harry Potter and the Chamber of Secrets",
        "isAvailable": false
    }, {
        "id": "3",
        "title": "Harry Potter and the Prisoner of Azkaban",
        "isAvailable": true
    }
];

let user = {
    id: "123",
    userName: "john_dae",
    name: "John Dae"
};

export function getUser(userName) {
    if (userName === "john_dae") {
        return user;
    }
    return null;
}

export function getBooks(args) {

    if (args && args.query) {
        return books.filter((book) => {
            if (book.title.search(new RegExp(args.query, "i")) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    }else{
        return books;
    }
}
