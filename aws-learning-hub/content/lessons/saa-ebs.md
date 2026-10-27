---
id: saa-ebs
title: "SAA: Amazon EBS, Snapshot & Encryption"
domain: Storage
duration_minutes: 50
level: Associate
course_id: aws-solutions-architect-associate
published: true
---

# Amazon EBS

EBS là block storage bền vững cho EC2: root volume, database tự quản và application data. Volume và EC2 phải cùng Availability Zone.

| Dấu hiệu đề bài | Chọn |
| --- | --- |
| Disk persistent cho một EC2/database | EBS |
| Nhiều Linux mount chung file system | EFS |
| Object, backup, data lake | S3 |
| Cache/scratch local chấp nhận mất dữ liệu | Instance Store |

## Volume types

- **gp3**: mặc định cho app, boot volume, database vừa phải.
- **io2**: database mission-critical, IOPS cao và ổn định.
- **st1**: HDD cho sequential throughput như log/big data.
- **sc1**: cold HDD chi phí thấp.

`st1` và `sc1` không dùng làm boot/root volume. Database random I/O thường ưu tiên SSD.

## Snapshot & encryption

Snapshot incremental sau snapshot đầu tiên; có thể tạo volume ở AZ khác, copy sang Region khác hoặc tạo AMI. Muốn mã hóa volume/snapshot chưa mã hóa: snapshot → copy snapshot và bật KMS encryption → tạo volume mới. Snapshot đã mã hóa sẽ tạo volume mã hóa.

## Quiz
<!-- quiz: Database chạy trên EC2 dùng EBS cần disaster recovery khi AZ lỗi. Giải pháp đúng nhất là gì? -->
<!-- option: Attach trực tiếp volume EBS AZ cũ vào EC2 ở AZ mới -->
<!-- option: Tạo EBS snapshot và tạo volume mới từ snapshot tại AZ đích | correct -->
<!-- option: Dùng st1 làm root volume ở AZ mới -->
<!-- option: Chuyển EBS volume giữa AZ mà không cần snapshot -->
<!-- explanation: EBS là AZ-scoped. Snapshot cho phép tạo volume mới ở AZ khác; copy snapshot khi cần DR cross-Region. -->
