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

## Quiz
<!-- quiz: Đội vận hành muốn đặt policy backup tập trung và copy recovery points của RDS/EBS sang account khác. Dịch vụ phù hợp nhất? -->
<!-- option: Amazon CloudTrail -->
<!-- option: AWS Backup | correct -->
<!-- option: Amazon SQS -->
<!-- option: AWS Config -->
<!-- explanation: AWS Backup cung cấp backup plan, vault và các tùy chọn central governance/copy backup cho nhiều AWS resources. -->
