import React from 'react';

const TopBar = ({ stats, currentUser, onLogout }) => {
    return (
        <header className="top-bar">
            <div className="logo-section">
                <div className="logo-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                </div>
                <div className="logo-text">
                    <h1>College Library</h1>
                    <p>Book Issue & Return Service</p>
                </div>
            </div>
            
            <div className="stats-section" style={{ alignItems: 'center' }}>
                <div className="stat-box">
                    <span className="stat-label">Books</span>
                    <span className="stat-value">{stats.totalBooks}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Available</span>
                    <span className="stat-value">{stats.availableBooks}</span>
                </div>
                {currentUser?.role === 'LIBRARIAN' && (
                    <>
                        <div className="stat-box">
                            <span className="stat-label">Members</span>
                            <span className="stat-value">{stats.totalMembers}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Active Issues</span>
                            <span className="stat-value">{stats.activeIssues}</span>
                        </div>
                    </>
                )}
                
                {currentUser && (
                    <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                            {currentUser.role === 'LIBRARIAN' ? 'Librarian Admin' : currentUser.name}
                        </span>
                        <button 
                            className="btn-sm" 
                            onClick={onLogout}
                            style={{ marginTop: '0.25rem', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
