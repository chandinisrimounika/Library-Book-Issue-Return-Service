import React, { useState } from 'react';
import { registerMember } from '../api';

const Members = ({ members, memberIssueCounts, fetchMembers, addToast }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerMember({ name, email });
            addToast('Member registered successfully!', 'success');
            setName('');
            setEmail('');
            fetchMembers();
        } catch (error) {
            addToast('Failed to register member', 'error');
        }
    };

    return (
        <div className="view-section active">
            <div className="split-layout">
                <aside className="form-sidebar card">
                    <h2>Register Member</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="member-name">Name</label>
                            <input 
                                type="text" 
                                id="member-name" 
                                placeholder="Diana Prince" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="member-email">Email</label>
                            <input 
                                type="email" 
                                id="member-email" 
                                placeholder="diana@college.edu" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-primary">Register</button>
                    </form>
                </aside>
                
                <section className="table-content card">
                    <div className="table-header">
                        <h2>Members</h2>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="text-right">Active Issues</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr><td colSpan="4" className="empty-state">No members registered.</td></tr>
                                ) : (
                                    members.map(member => (
                                        <tr key={member.memberId}>
                                            <td>{member.memberId}</td>
                                            <td>{member.name}</td>
                                            <td>{member.email}</td>
                                            <td className="text-right">
                                                {memberIssueCounts[member.memberId] || 0} / 3
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

export default Members;
