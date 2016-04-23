let books = [];
books.push({
    "id": "1",
    "title": "Five point some one",
    "pubDate": "2015/01/25"
},{
    "id": "2",
    "title": "Food in five minute",
    "pubDate": "2015/05/05"
},{
    "id": "3",
    "title": "Fame for five minute",
    "pubDate": "2016/02/05"
});


for (let i = books.length + 1; i <= 10; i++) {

    let book = {
        "id": `${i}`,
        "title": `Book ${i}`
    };

    books.push(book);

}

export function getBooks(args) {
    let _books = books;

    if(args && (args.pubStartDate || args.pubEndDate)){

        const _pubStartDate = new Date(args.pubStartDate);
        const _pubEndDate = new Date(args.pubEndDate);

        _books = _books.filter((book) =>{
            const _pubDate = new Date(book.pubDate);
            if(_pubDate.getTime() <=_pubEndDate.getTime() && _pubDate.getTime() >=_pubStartDate.getTime()){
                return true;
            }else{
                return false;
            }
        });

    }

    if(args && args.query){
        _books = _books.filter((book) =>{
            if(book.title.search(new RegExp(args.query, "i")) >= 0){
                return true;
            }else{
                return false;
            }
        });
    }

    return _books;
}
