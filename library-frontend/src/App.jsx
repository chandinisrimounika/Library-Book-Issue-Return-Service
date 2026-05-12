import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import Books from './pages/Books';
import Members from './pages/Members';
import Issues from './pages/Issues';
import History from './pages/History';
import Login from './pages/Login';
import { ToastContainer } from './components/Toast';
import { getBooks, getMembers, getMemberIssues } from './api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [allIssues, setAllIssues] = useState([]);
  const [memberIssueCounts, setMemberIssueCounts] = useState({});
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshAllData = async () => {
    try {
      const [booksRes, membersRes] = await Promise.all([
        getBooks(),
        getMembers()
      ]);
      setBooks(booksRes.data);
      const membersData = membersRes.data;
      setMembers(membersData);

      let issuesArray = [];
      let counts = {};

      for (const member of membersData) {
        const res = await getMemberIssues(member.memberId);
        const memberIssues = res.data;
        issuesArray = issuesArray.concat(memberIssues);
        counts[member.memberId] = memberIssues.filter(i => i.returnDate === null).length;
      }
      
      setAllIssues(issuesArray);
      setMemberIssueCounts(counts);

    } catch (error) {
      console.error("Error fetching data:", error);
      addToast("Failed to fetch data from server.", "error");
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const activeIssues = allIssues.filter(i => i.returnDate === null);
  const availableBooks = books.filter(b => b.available);

  const stats = {
    totalBooks: books.length,
    availableBooks: availableBooks.length,
    totalMembers: members.length,
    activeIssues: activeIssues.length
  };

  const handleLogin = (user) => {
      setCurrentUser(user);
      addToast(`Logged in as ${user.role}`, 'success');
  };

  const handleLogout = () => {
      setCurrentUser(null);
      addToast('Logged out successfully', 'success');
  };

  if (!currentUser) {
      return (
          <div className="app-container">
              <TopBar stats={stats} />
              <Login members={members} onLogin={handleLogin} />
              <ToastContainer toasts={toasts} removeToast={removeToast} />
          </div>
      );
  }

  return (
    <Router>
      <div className="app-container">
        <TopBar stats={stats} currentUser={currentUser} onLogout={handleLogout} />

        <main className="main-content">
          <nav className="tabs-nav">
            <NavLink to="/books" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              Books
            </NavLink>
            {currentUser.role === 'LIBRARIAN' && (
                <>
                    <NavLink to="/members" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      Members
                    </NavLink>
                    <NavLink to="/issues" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                      Issue / Return
                    </NavLink>
                </>
            )}
            <NavLink to="/history" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              History
            </NavLink>
          </nav>

          <Routes>
            <Route path="/books" element={<Books books={books} fetchBooks={refreshAllData} addToast={addToast} currentUser={currentUser} />} />
            
            {currentUser.role === 'LIBRARIAN' && (
                <>
                    <Route path="/members" element={<Members members={members} memberIssueCounts={memberIssueCounts} fetchMembers={refreshAllData} addToast={addToast} />} />
                    <Route path="/issues" element={<Issues books={books} members={members} activeIssues={activeIssues} refreshAllData={refreshAllData} addToast={addToast} />} />
                </>
            )}

            <Route path="/history" element={<History allIssues={allIssues} currentUser={currentUser} />} />
            
            <Route path="*" element={<Navigate to="/books" replace />} />
          </Routes>
        </main>
      </div>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Router>
  );
}

export default App;
