---
id: saa-migration-dr
title: "SAA: MGN, DRS, DMS & DataSync"
domain: Migration
duration_minutes: 45
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Migration & disaster recovery services

| Requirement | Chọn |
| --- | --- |
| Lift-and-shift server/VM | Application Migration Service (MGN) |
| Database migration + CDC | Database Migration Service (DMS) |
| Continuous server replication cho DR | Elastic Disaster Recovery (DRS) |
| Online file copy NFS/SMB | DataSync |
| Offline large-scale data | Snowball |

MGN dành cho server migration; DRS dành cho recovery. DMS phù hợp database migration/replication với downtime thấp, nhưng source/target compatibility vẫn cần được xác minh theo engine.

## Phân biệt công cụ

- **MGN**: lift-and-shift physical/VM server; replicate rồi launch test/cutover instances.
- **DMS**: database full load và ongoing replication/CDC. Heterogeneous database thường cần Schema Conversion Tool cho schema/code conversion.
- **DRS**: continuous block-level replication để recover server workload khi disaster.
- **DataSync**: transfer online NFS/SMB/object data; **Snowball** cho PB data/offline network-limited.

## Quy trình chọn đáp án

1. Đối tượng là server, database, file hay data offline?
2. Migration một lần hay replication liên tục?
3. RTO/RPO và downtime cho phép là bao nhiêu?
4. Có cần schema conversion giữa database engine khác nhau không?

## Scenario & bẫy thi

VM on-prem lên AWS ít thay đổi ứng dụng: MGN. Database cần CDC với downtime thấp: DMS. DRS không thay retention/compliance backup strategy; DMS không tự đảm bảo mọi stored procedure/schema feature được chuyển đổi.

## Quiz
<!-- quiz: Công ty cần migrate VM on-premises lên AWS theo lift-and-shift, tối thiểu thay đổi ứng dụng. Dịch vụ chính? -->
<!-- option: AWS Application Migration Service (MGN) | correct -->
<!-- option: AWS Database Migration Service -->
<!-- option: Amazon Kinesis Data Streams -->
<!-- option: AWS Glue -->
<!-- explanation: MGN được thiết kế cho lift-and-shift server migration; DMS tập trung dữ liệu database. -->
