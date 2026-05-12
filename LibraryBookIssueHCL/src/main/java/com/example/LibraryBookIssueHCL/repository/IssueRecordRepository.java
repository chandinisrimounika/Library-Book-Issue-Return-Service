package com.example.LibraryBookIssueHCL.repository;

import com.example.LibraryBookIssueHCL.model.IssueRecord;
import com.example.LibraryBookIssueHCL.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    long countByMemberAndReturnDateIsNull(Member member);
    List<IssueRecord> findByMemberAndReturnDateIsNull(Member member);
    List<IssueRecord> findByMember(Member member);
}
