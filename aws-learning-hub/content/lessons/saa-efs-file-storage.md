---
id: saa-efs-file-storage
title: "SAA: EFS & File Storage Patterns"
domain: Storage
duration_minutes: 35
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# EFS & file storage

| Requirement | Chọn |
| --- | --- |
| Shared Linux NFS, multi-AZ | EFS |
| Windows SMB + Active Directory | FSx for Windows |
| HPC Lustre | FSx for Lustre |
| Disk cho một EC2 | EBS |

EFS là regional service với mount targets ở các AZ client sử dụng. EFS lifecycle management có thể chuyển file ít truy cập sang IA/Archive. EFS One Zone rẻ hơn nhưng không thay thế EFS Standard nếu đề yêu cầu multi-AZ resilience.

## Quiz
<!-- quiz: Web farm Linux ở nhiều AZ cần mount chung upload directory. Dịch vụ đúng nhất? -->
<!-- option: Amazon EBS gp3 -->
<!-- option: Amazon EFS | correct -->
<!-- option: Amazon S3 Glacier -->
<!-- option: FSx for Windows File Server -->
<!-- explanation: EFS là shared NFS file system cho Linux workloads và có mount target multi-AZ. -->
