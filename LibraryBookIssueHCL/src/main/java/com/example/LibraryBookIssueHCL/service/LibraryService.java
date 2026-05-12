package com.example.LibraryBookIssueHCL.service;

import com.example.LibraryBookIssueHCL.model.Book;
import com.example.LibraryBookIssueHCL.model.IssueRecord;
import com.example.LibraryBookIssueHCL.model.Member;
import com.example.LibraryBookIssueHCL.repository.BookRepository;
import com.example.LibraryBookIssueHCL.repository.IssueRecordRepository;
import com.example.LibraryBookIssueHCL.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LibraryService {

    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final IssueRecordRepository issueRecordRepository;

    public LibraryService(BookRepository bookRepository, MemberRepository memberRepository, IssueRecordRepository issueRecordRepository) {
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
        this.issueRecordRepository = issueRecordRepository;
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }

    public Member registerMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with ID: " + id));
    }

    public List<IssueRecord> getMemberIssueHistory(Long memberId) {
        Member member = getMemberById(memberId);
        return issueRecordRepository.findByMember(member);
    }

    @Transactional
    public IssueRecord issueBook(Long bookId, Long memberId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        
        Member member = getMemberById(memberId);

        if (!book.isAvailable()) {
            throw new RuntimeException("Book is currently not available for issue.");
        }

        long activeIssuesCount = issueRecordRepository.countByMemberAndReturnDateIsNull(member);
        if (activeIssuesCount >= 3) {
            throw new RuntimeException("Member has already reached the maximum limit of 3 active book issues.");
        }

        book.setAvailable(false);
        bookRepository.save(book);

        IssueRecord issueRecord = new IssueRecord();
        issueRecord.setBook(book);
        issueRecord.setMember(member);
        issueRecord.setIssueDate(LocalDate.now());

        return issueRecordRepository.save(issueRecord);
    }

    @Transactional
    public IssueRecord returnBook(Long issueId) {
        IssueRecord issueRecord = issueRecordRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue record not found with ID: " + issueId));

        if (issueRecord.getReturnDate() != null) {
            throw new RuntimeException("Book is already returned for this issue record.");
        }

        issueRecord.setReturnDate(LocalDate.now());
        
        Book book = issueRecord.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        return issueRecordRepository.save(issueRecord);
    }
}
