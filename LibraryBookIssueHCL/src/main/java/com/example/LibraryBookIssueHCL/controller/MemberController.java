package com.example.LibraryBookIssueHCL.controller;

import com.example.LibraryBookIssueHCL.model.IssueRecord;
import com.example.LibraryBookIssueHCL.model.Member;
import com.example.LibraryBookIssueHCL.service.LibraryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final LibraryService libraryService;

    public MemberController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping
    public ResponseEntity<Member> registerMember(@RequestBody Member member) {
        Member savedMember = libraryService.registerMember(member);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberDetails(@PathVariable Long id) {
        return ResponseEntity.ok(libraryService.getMemberById(id));
    }

    @GetMapping("/{id}/issues")
    public ResponseEntity<List<IssueRecord>> getMemberIssues(@PathVariable Long id) {
        return ResponseEntity.ok(libraryService.getMemberIssueHistory(id));
    }
}
