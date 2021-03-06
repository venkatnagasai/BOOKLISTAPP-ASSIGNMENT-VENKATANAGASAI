const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();


let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    
   
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    
  
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let saveBook = JSON.stringify(books);
fs.writeFile('bookdata.txt', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});


app.post('/book', (req, res) => {
    const book = req.body;
   

    
    console.log(book);
    books.push(book);
 
    let saveBook = JSON.stringify(books);
    fs.writeFile('bookdata.txt', saveBook , function (err) {
        if (err) throw err;
        console.log('Stored Books!');
    });

   res.send('Book is added to the database ');
    
    
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../client', 'index.html'));
});

app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    
    const isbn = req.params.isbn;

    
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    
    const isbn = req.params.isbn;

    
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });
    let saveBook = JSON.stringify(books);
    fs.writeFile('bookdata.txt', saveBook , function (err) {
        if (err) throw err;
        console.log('Stored Books!');
    });
    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
 
    const isbn = req.params.isbn;
    const newBook = req.body;

    
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    

    let saveBook = JSON.stringify(books);
fs.writeFile('bookdata.txt', saveBook , function (err) {
    if (err) throw err;
    console.log('Stored Books!');
});

    res.send('Book is edited');
});

app.listen(3000, () => console.log(`Hello world app listening on port `));