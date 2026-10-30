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

## Quiz
<!-- quiz: Công ty cần migrate VM on-premises lên AWS theo lift-and-shift, tối thiểu thay đổi ứng dụng. Dịch vụ chính? -->
<!-- option: AWS Application Migration Service (MGN) | correct -->
<!-- option: AWS Database Migration Service -->
<!-- option: Amazon Kinesis Data Streams -->
<!-- option: AWS Glue -->
<!-- explanation: MGN được thiết kế cho lift-and-shift server migration; DMS tập trung dữ liệu database. -->
