import React, { useState } from 'react';

const Login = ({ members, onLogin }) => {
    const [selectedMemberId, setSelectedMemberId] = useState('');

    const handleLibrarianLogin = () => {
        onLogin({ role: 'LIBRARIAN' });
    };

    const handleMemberLogin = (e) => {
        e.preventDefault();
        if (!selectedMemberId) return;
        
        const member = members.find(m => m.memberId === Number(selectedMemberId));
        if (member) {
            onLogin({ role: 'MEMBER', ...member });
        }
    };

    return (
        <div className="login-container" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh' 
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="logo-icon" style={{ margin: '0 auto 1rem auto' }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select your role to continue</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <button 
                        className="btn-primary" 
                        onClick={handleLibrarianLogin}
                        style={{ width: '100%', marginBottom: '1rem' }}
                    >
                        Login as Librarian
                    </button>
                </div>

                <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem' }}>
                    <hr style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none' }} />
                    <span style={{ 
                        position: 'absolute', 
                        top: '-10px', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        backgroundColor: 'var(--card-bg)', 
                        padding: '0 10px',
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem'
                    }}>
                        OR
                    </span>
                </div>

                <form onSubmit={handleMemberLogin}>
                    <div className="form-group">
                        <label htmlFor="member-select">Login as Member</label>
                        <select 
                            id="member-select" 
                            value={selectedMemberId}
                            onChange={(e) => setSelectedMemberId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select your profile</option>
                            {members.map(member => (
                                <option key={member.memberId} value={member.memberId}>
                                    {member.name} ({member.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn-sm" style={{ width: '100%', padding: '0.8rem' }}>
                        Enter as Member
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
