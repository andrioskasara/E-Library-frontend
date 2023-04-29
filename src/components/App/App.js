import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Countries from "../Countries/countries";
import Authors from "../Authors/authors"
import Books from "../Books/BookList/books";
import Categories from "../Categories/categories";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import LibraryService from "../../repository/libraryRepository";
import Header from "../Header/header";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            authors: [],
            books: [],
            categories: [],
            selectedBook: {}
        };
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/categories"} element={<Categories categories={this.state.categories}/>}/>
                            <Route path={"/countries"} element={<Countries countries={this.state.countries}/>}/>
                            <Route path={"/authors"} element={<Authors authors={this.state.authors}/>}/>
                            <Route path={"/books/add"}
                                   element={<BookAdd countries={this.state.countries}
                                                     authors={this.state.authors}
                                                     categories={this.state.categories}
                                                     onAddBook={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"}
                                   element={<BookEdit countries={this.state.countries}
                                                      authors={this.state.authors}
                                                      categories={this.state.categories}
                                                      onEditBook={this.editBook}
                                                      book={this.state.selectedBook}/>}/>
                            <Route path={"/books"}
                                   element={<Books books={this.state.books}
                                                   onDelete={this.deleteBook}
                                                   onEdit={this.getBook}
                                                   onMark={this.markAsTakenBook}/>}/>
                            <Route path={"/*"} element={<Navigate to="/books"/>}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadCountries();
        this.loadAuthors();
        this.loadCategories();
        this.loadBooks();
    }

    loadCountries = () => {
        LibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            });
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            });
    }

    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    markAsTakenBook = (id) => {
        LibraryService.marAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }

}

export default App;
