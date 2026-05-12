import React, { useState } from 'react';
import { addBook } from '../api';

const Books = ({ books, fetchBooks, addToast, currentUser }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await addBook({ title, author, available: true });
            addToast('Book added successfully!', 'success');
            setTitle('');
            setAuthor('');
            fetchBooks();
        } catch (error) {
            addToast('Failed to add book', 'error');
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchBooks(query);
    };

    return (
        <div className="view-section active">
            <div className={currentUser?.role === 'LIBRARIAN' ? 'split-layout' : ''}>
                {currentUser?.role === 'LIBRARIAN' && (
                    <aside className="form-sidebar card">
                        <h2>Add a Book</h2>
                        <form onSubmit={handleAddBook}>
                            <div className="form-group">
                                <label htmlFor="book-title">Title</label>
                                <input 
                                    type="text" 
                                    id="book-title" 
                                    placeholder="Refactoring" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="book-author">Author</label>
                                <input 
                                    type="text" 
                                    id="book-author" 
                                    placeholder="Martin Fowler" 
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn-primary">Add Book</button>
                        </form>
                    </aside>
                )}
                
                <section className="table-content card">
                    <div className="table-header">
                        <h2>Catalog</h2>
                        <div className="search-box">
                            <input 
                                type="text" 
                                placeholder="Search by title or author..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th className="text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.length === 0 ? (
                                    <tr><td colSpan="4" className="empty-state">No books found.</td></tr>
                                ) : (
                                    books.map(book => (
                                        <tr key={book.bookId}>
                                            <td>{book.bookId}</td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td className="text-right">
                                                {book.available ? (
                                                    <span className="badge badge-available">Available</span>
                                                ) : (
                                                    <span className="badge badge-issued">Issued</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Books;
