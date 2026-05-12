import React, { useState } from 'react';
import { issueBook, returnBook } from '../api';

const Issues = ({ books, members, activeIssues, refreshAllData, addToast }) => {
    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');

    const availableBooks = books.filter(b => b.available);

    const handleIssue = async (e) => {
        e.preventDefault();
        if (!selectedBookId || !selectedMemberId) {
            addToast('Please select both a book and a member', 'error');
            return;
        }
        try {
            await issueBook({ 
                bookId: Number(selectedBookId), 
                memberId: Number(selectedMemberId) 
            });
            addToast('Book issued successfully!', 'success');
            setSelectedBookId('');
            setSelectedMemberId('');
            refreshAllData();
        } catch (error) {
            addToast('Failed to issue book: ' + (error.response?.data?.message || error.message), 'error');
        }
    };

    const handleReturn = async (issueId) => {
        try {
            await returnBook(issueId);
            addToast('Book returned successfully!', 'success');
            refreshAllData();
        } catch (error) {
            addToast('Failed to return book', 'error');
        }
    };

    return (
        <div className="view-section active">
            <div className="split-layout">
                <aside className="form-sidebar card">
                    <h2>Issue a Book</h2>
                    <form onSubmit={handleIssue}>
                        <div className="form-group">
                            <label htmlFor="issue-book-select">Book</label>
                            <select 
                                id="issue-book-select" 
                                value={selectedBookId}
                                onChange={(e) => setSelectedBookId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select an available book</option>
                                {availableBooks.map(book => (
                                    <option key={book.bookId} value={book.bookId}>
                                        #{book.bookId} — {book.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="issue-member-select">Member</label>
                            <select 
                                id="issue-member-select" 
                                value={selectedMemberId}
                                onChange={(e) => setSelectedMemberId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a member</option>
                                {members.map(member => (
                                    <option key={member.memberId} value={member.memberId}>
                                        #{member.memberId} — {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">Issue Book</button>
                    </form>
                </aside>
                
                <section className="table-content card">
                    <div className="table-header">
                        <h2>Active Issues</h2>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book</th>
                                    <th>Member</th>
                                    <th>Issued</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeIssues.length === 0 ? (
                                    <tr><td colSpan="5" className="empty-state">No active issues.</td></tr>
                                ) : (
                                    activeIssues.map(issue => (
                                        <tr key={issue.issueId}>
                                            <td>{issue.issueId}</td>
                                            <td>{issue.book.title}</td>
                                            <td>{issue.member.name}</td>
                                            <td>{issue.issueDate}</td>
                                            <td className="text-right">
                                                <button 
                                                    className="btn-sm" 
                                                    onClick={() => handleReturn(issue.issueId)}
                                                >
                                                    Return
                                                </button>
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

export default Issues;
