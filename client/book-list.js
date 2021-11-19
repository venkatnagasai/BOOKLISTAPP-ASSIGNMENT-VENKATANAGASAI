

const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title, 
        author, 
        
  
    } = book;

    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    
  
  

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);    //sendin request to delete method
    xhttp.send();

    location.reload();
}
const searchBook = () => {
    let getName = document.getElementById('bookName').value.trim();
    document.getElementById('books').innerHTML = '';
    console.log(getName);

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        if(getName === ''){
            const template = `
            <div>
            <div>
              <div >
         
          
          <table class="table table-responsive">
          <thead>
          <tr>
          <td colspan="1" style= "width:25%">ISBN:${book.isbn}</td>
          <td colspan="1" style="width:25%">TITLE: ${book.title}</td>
          <td colspan="2" style=" width:25%">AUTHOR: ${book.author}</td>
         
             <hr>

          <td>   <button type="button" class="btn btn-danger" data-toggle="modal" 
             data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">Delete</button>
             <button types="button" class="btn btn-primary" data-toggle="modal" 
                 data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                 Edit
             </button></td>
             </tr>
             </thead>
             </table>
         </div>
     </div>
 </div>
        `
        document.getElementById('books').innerHTML += template;

        } else if(getName === book.title || getName === book.isbn || getName === book.author || getName === book.publisher) {
            const template = `
            <div>
                       <div>
                         <div >
					
					 
					 <table class="table table-responsive">
					 <thead>
					 <tr>
					 <td colspan="1" style= "width:25%"><h4>ISBN</h4>${book.isbn}</td>
					 <td colspan="1" style="width:25%"><h4>TITLE</h4> ${book.title}</td>
					 <td colspan="2" style=" width:25%"><h4>AUTHOR</h4> ${book.author}</td>
					
                        <hr>

                     <td>   <button type="button" class="btn btn-danger" data-toggle="modal" 
                        data-target="#deleteBookModal" onClick="deleteBook(${book.isbn})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button></td>
                        </tr>
                        </thead>
                        </table>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML += template;
        }
    }
}


const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);
	

    for (let book of books) {
        const x = `
            
			
					 <div>
                       <div>
                         <div >
					
					 
					 <table class="table table-responsive">
					 <thead>
					 <tr>
					 <td colspan="1" style= "width:25%">${book.isbn}</td>
					 <td colspan="1" style="width:25%"> ${book.title}</td>
					 <td colspan="2" style=" width:25%"> ${book.author}</td>
					
					 
                       


                       
                    

                        

  <td colspan="2" style="text-align:center width:25%">  <button type="button" class="btn btn-danger"  onClick = "deleteBook(${book.isbn})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg></button>
     <button types="button" class="btn btn-primary" data-toggle="modal" 
     data-target="#editBookModal" onClick="setEditModal(${book.isbn})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
         Edit </svg>
                            
                        </button></td>
						 </tr>
					 </thead>
					 </table>
					 
					
    

						
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}
set=true;
function showbooks() { 
    if(set) {document.getElementById("hide").style.display="block";  set=false;
}
else {
    document.getElementById("hide").style.display="none";
    set=true;
 }
}
// setTimeout (()=>{
//     location.reload()
// },20000)

loadBooks();