import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getBooks = (query = '') => {
    return query ? api.get(`/books/search?query=${encodeURIComponent(query)}`) : api.get('/books');
};

export const addBook = (book) => api.post('/books', book);

export const getMembers = () => api.get('/members');

export const registerMember = (member) => api.post('/members', member);

export const getMemberIssues = (memberId) => api.get(`/members/${memberId}/issues`);

export const issueBook = (issueData) => api.post('/issues/issue', issueData);

export const returnBook = (issueId) => api.put(`/issues/return/${issueId}`);

export default api;
