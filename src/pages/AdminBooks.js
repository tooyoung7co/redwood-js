import React, { useState, useEffect, Fragment } from 'react';
import { MdArrowForwardIos, MdDeleteOutline, MdBorderColor, MdAdd } from 'react-icons/md';
import styles from '../Book.list.css';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/Navbar/NavBar'

const BookDropdownTree = (props) => {
//   const [books, setBooks] = useState([
//     { id: 1, title: "Oxford Progress 2", semester: "1" },
//     { id: 2, title: "Oxford Progress Workbook 2", semester: "2" },
//     { id: 3, title: "Grammar Galaxy 1", semester: "1,2" }
//   ]);

const [shownComments, setShownComments] = useState({});

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };

  return (
    <Fragment>
      {props.class_list.map(obj => (
        <div key={obj.id}>
          {obj.class ? (
            <button onClick={() => toggleComment(obj.id)}>{obj.class}</button>
          ) : null}
          {shownComments[obj.id] ? <p>{obj.books_list}</p> : null}
        </div>
      ))}
    </Fragment>
  );
};

const BookList = () => {
  // Example data
  const grades = ['1st Grade', '2nd Grade', '3rd Grade'];
  const books = {
    'ClassA': ['Book A', 'Book B', 'Book C'],
    'ClassB': ['Book D', 'Book E', 'Book F'],
    'ClassC': ['Book G', 'Book H', 'Book I'],
  };

  return (
    <div>
        <div>
            <NavBar />
        </div>
        <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6" data-aos="zoom-in">
            <h1>Elementary School Books</h1>
            <BookDropdownTree class_list={
                [
                    { id: 0, class: "ClassA", books_list: books.ClassA },
                    { id: 1, class: "ClassB", books_list: books.ClassB },
                    { id: 2, class: "ClassC", books_list: books.ClassC }
                ]
            }/>
        </div>
      
    </div>
  );
};

//   return (
//     <div>
//         <div>
//             <NavBar />
//         </div>
//         <div className="m-auto overflow-hidden mx-4 mt-8 lg:mt-4 p-2 md:p-12 h-5/6" data-aos="zoom-in">
//             <div className="flex flex-col py-8 justify-between text-center">
//                 <button onClick={handleAddBook} style={{ float: 'right', margin: '10px' }}>
//                     Add Book
//                 </button>
//                 <table>
//                     <thead>
//                     <tr>
//                         <th>Book Title</th>
//                         <th>Semester</th>
//                         <th>Action</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {books.map(book => (
//                         <tr key={book.id}>
//                         <td>{book.title}</td>
//                         <td>{book.semester}</td>
//                         <td>
//                             <button onClick={() => handleEdit(book.id)}>Edit</button>
//                         </td>
//                         <td>
//                             <button onClick={() => handleDelete(book.id)}>Delete</button>
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
      
//     </div>
//   );

export default BookList;