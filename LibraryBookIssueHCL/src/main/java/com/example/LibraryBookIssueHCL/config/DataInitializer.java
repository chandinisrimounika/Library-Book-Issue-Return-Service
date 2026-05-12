package com.example.LibraryBookIssueHCL.config;

import com.example.LibraryBookIssueHCL.model.Book;
import com.example.LibraryBookIssueHCL.model.Member;
import com.example.LibraryBookIssueHCL.repository.BookRepository;
import com.example.LibraryBookIssueHCL.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadInitialData(BookRepository bookRepo, MemberRepository memberRepo) {
        return args -> {
            if (bookRepo.count() == 0) {
                // Initialize sample books
                Book b1 = new Book(null, "The Pragmatic Programmer", "David Thomas", true);
                Book b2 = new Book(null, "Clean Code", "Robert C. Martin", true);
                Book b3 = new Book(null, "Designing Data-Intensive Applications", "Martin Kleppmann", true);
                Book b4 = new Book(null, "Refactoring", "Martin Fowler", true);
                Book b5 = new Book(null, "Effective Java", "Joshua Bloch", true);
                
                bookRepo.saveAll(Arrays.asList(b1, b2, b3, b4, b5));
                System.out.println("Sample books have been initialized.");
            }

            if (memberRepo.count() == 0) {
                // Initialize sample members
                Member m1 = new Member(null, "Alice Smith", "alice.smith@example.com");
                Member m2 = new Member(null, "Bob Jones", "bob.jones@example.com");
                Member m3 = new Member(null, "Charlie Davis", "charlie.davis@example.com");
                
                memberRepo.saveAll(Arrays.asList(m1, m2, m3));
                System.out.println("Sample members have been initialized.");
            }
        };
    }
}
