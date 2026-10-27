---
id: saa-efs-fsx
title: "SAA: EFS, FSx & Shared File Storage"
domain: Storage
duration_minutes: 40
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# EFS & FSx

Khi đề yêu cầu nhiều instance cùng mount một file system, đừng chọn EBS. Hãy xác định OS, giao thức và workload để chọn EFS hoặc FSx.

| Yêu cầu | Chọn |
| --- | --- |
| Shared POSIX file system cho Linux, multi-AZ | EFS |
| Windows file shares SMB/Active Directory | FSx for Windows File Server |
| HPC, throughput/IOPS cực cao, Lustre | FSx for Lustre |
| NetApp features, NFS/SMB/iSCSI | FSx for NetApp ONTAP |

## EFS facts

- EFS là regional service, mount targets đặt trong từng AZ cần dùng.
- Hỗ trợ NFS, Linux instances, scale tự động.
- EFS Standard lưu multi-AZ; EFS One Zone rẻ hơn nhưng chỉ một AZ.
- Lifecycle management có thể chuyển file ít truy cập sang EFS Infrequent Access/Archive.

## Scenario

Web farm Linux trên nhiều EC2/AZ cần dùng chung avatar upload: EFS với mount target ở mỗi AZ. Nếu cần Windows home directory tích hợp AD: FSx for Windows.

## Quiz
<!-- quiz: Nhiều Windows EC2 cần chung thư mục SMB, hỗ trợ Microsoft Active Directory. Chọn gì? -->
<!-- option: Amazon EFS -->
<!-- option: Amazon FSx for Windows File Server | correct -->
<!-- option: Amazon S3 Glacier -->
<!-- option: EBS Multi-Attach cho gp3 -->
<!-- explanation: FSx for Windows cung cấp managed Windows file share SMB và tích hợp Active Directory. -->
