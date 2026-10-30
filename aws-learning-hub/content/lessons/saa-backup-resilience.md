---
id: saa-backup-resilience
title: "SAA: AWS Backup, RTO & RPO"
domain: Security
duration_minutes: 40
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Backup & resilience

AWS Backup dùng backup plans và backup vaults để quản lý tập trung backup của RDS, EBS, EFS và nhiều AWS resources khác.

| Requirement | Pattern |
| --- | --- |
| Rẻ nhất, chấp nhận khôi phục lâu | Backup and restore |
| Core system chạy sẵn tối thiểu | Pilot light |
| Hệ thống thu nhỏ sẵn sàng scale | Warm standby |
| RTO/RPO rất thấp đa Region | Active-active |

**RTO** là thời gian tối đa để khôi phục; **RPO** là lượng dữ liệu có thể mất tính theo thời gian.

## AWS Backup chi tiết

AWS Backup dùng backup plan, backup vault, schedule, retention lifecycle và resource assignment để quản lý tập trung backup cho các resource hỗ trợ như EBS, EFS, RDS và DynamoDB. Nó hỗ trợ copy recovery point sang Region/account để tăng isolation. Snapshot riêng vẫn hợp lệ; chọn AWS Backup khi đề cần governance đồng nhất cho nhiều resource/account.

## Chọn DR theo RTO/RPO

1. Xác định failure domain: instance, AZ, Region hay account.
2. Tìm RTO/RPO: workload có cần chạy sẵn không?
3. Chọn pattern rẻ nhất đáp ứng yêu cầu.

- RDS Multi-AZ: HA trong một Region, không thay cross-Region DR.
- S3 Versioning + CRR: chống overwrite/delete và copy data sang Region khác.
- EBS snapshot: restore volume, có thể copy Region.
- Route 53 failover: điều hướng DNS, không replicate data.

## Scenario & bẫy thi

Production có RDS/EBS/EFS cần backup hằng ngày, giữ 90 ngày và copy sang account DR: AWS Backup plan + vault + cross-account copy. Nếu đề yêu cầu recover sau Region failure trong vài phút, backup-only thường không đủ; xem warm standby/active-active và test restore runbook.

## Quiz
<!-- quiz: Đội vận hành muốn đặt policy backup tập trung và copy recovery points của RDS/EBS sang account khác. Dịch vụ phù hợp nhất? -->
<!-- option: Amazon CloudTrail -->
<!-- option: AWS Backup | correct -->
<!-- option: Amazon SQS -->
<!-- option: AWS Config -->
<!-- explanation: AWS Backup cung cấp backup plan, vault và các tùy chọn central governance/copy backup cho nhiều AWS resources. -->
