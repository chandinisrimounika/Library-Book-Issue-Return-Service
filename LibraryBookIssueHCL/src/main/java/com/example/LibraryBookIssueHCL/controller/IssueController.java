package com.example.LibraryBookIssueHCL.controller;

import com.example.LibraryBookIssueHCL.model.IssueRecord;
import com.example.LibraryBookIssueHCL.service.LibraryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private final LibraryService libraryService;

    public IssueController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping("/issue")
    public ResponseEntity<?> issueBook(@RequestBody Map<String, Long> payload) {
        try {
            Long bookId = payload.get("bookId");
            Long memberId = payload.get("memberId");
            
            if (bookId == null || memberId == null) {
                return ResponseEntity.badRequest().body("Both bookId and memberId are required.");
            }
            
            IssueRecord issueRecord = libraryService.issueBook(bookId, memberId);
            return ResponseEntity.ok(issueRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/return/{issueId}")
    public ResponseEntity<?> returnBook(@PathVariable Long issueId) {
        try {
            IssueRecord issueRecord = libraryService.returnBook(issueId);
            return ResponseEntity.ok(issueRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
