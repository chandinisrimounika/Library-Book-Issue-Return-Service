import React from 'react';

const History = ({ allIssues, currentUser }) => {
    // Only show returned books, filter for member if needed, and sort by ID descending
    const returnedHistory = allIssues
        .filter(issue => issue.returnDate !== null)
        .filter(issue => currentUser?.role === 'LIBRARIAN' || issue.member.memberId === currentUser?.memberId)
        .sort((a, b) => b.issueId - a.issueId);

    return (
        <div className="view-section active">
            <div className="card full-card">
                <div className="table-header">
                    <h2>Returned Books</h2>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book</th>
                                <th>Member</th>
                                <th>Issued</th>
                                <th>Returned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnedHistory.length === 0 ? (
                                <tr><td colSpan="5" className="empty-state">No history yet.</td></tr>
                            ) : (
                                returnedHistory.map(issue => (
                                    <tr key={issue.issueId}>
                                        <td>{issue.issueId}</td>
                                        <td>{issue.book.title}</td>
                                        <td>{issue.member.name}</td>
                                        <td>{issue.issueDate}</td>
                                        <td>{issue.returnDate}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
