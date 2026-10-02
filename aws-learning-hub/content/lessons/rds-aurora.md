---
id: rds-aurora
title: "RDS và Aurora: Database quan hệ managed"
domain: Database
duration_minutes: 60
level: Associate
video_url: ""
published: true
---

# Mục tiêu học tập

- Chọn RDS/Aurora cho SQL, transaction và relational workload.
- Phân biệt Multi-AZ, read replica, backup và failover.

## RDS và Aurora dùng khi nào?

Chọn RDS/Aurora khi ứng dụng cần relational schema, SQL query, joins và transaction ACID nhưng không muốn tự vận hành database server. RDS hỗ trợ nhiều engine phổ biến; Aurora là database cloud-native tương thích MySQL/PostgreSQL của AWS.

## High availability không đồng nghĩa read scaling

Multi-AZ DB instance deployment có standby đồng bộ ở AZ khác để failover, nhưng standby này không phục vụ read traffic. Nếu cần tăng read throughput, dùng read replica bất đồng bộ hoặc Multi-AZ DB cluster/Aurora reader phù hợp với engine và kiến trúc. Hãy đọc kỹ loại deployment trong đề thi trước khi kết luận.

## Backup và security

Automated backups cho phép point-in-time restore trong thời gian retention cấu hình; snapshot manual phù hợp lưu lâu hoặc copy. Đặt database trong private subnets qua DB subnet group, giới hạn inbound theo Security Group của application, mã hóa at rest bằng KMS và lưu database credentials trong Secrets Manager.

## Scenario kiến trúc

Ứng dụng ecommerce cần transaction và HA: app trong private subnet kết nối RDS Multi-AZ trong DB subnet group nhiều AZ. Nếu dashboard/reporting làm nặng truy vấn đọc, route phần read-only workload đến read replica, chấp nhận replica có thể lag.

## Lab an toàn

1. Dùng sandbox/free-tier phù hợp và tạo RDS private nếu tài khoản/network sẵn sàng.
2. Bật automated backups, cấu hình security group không public.
3. Thực hành tạo snapshot; không để DB chạy ngoài thời gian học nếu có phí.
4. Ghi RTO/RPO của lab vào nhật ký.

## Lỗi thường gặp

- Dùng Multi-AZ standby để scale read: standby DB instance không nhận read traffic.
- Mở public RDS và cho phép database port từ `0.0.0.0/0`.
- Dùng read replica như backup mà quên replica lag và quyền promote.

## Quiz

<!-- quiz: Ứng dụng SQL cần tự failover khi AZ gặp sự cố, nhưng không cần tăng read throughput. Chọn gì? -->
<!-- option: RDS Multi-AZ DB instance deployment | correct -->
<!-- option: Một read replica duy nhất -->
<!-- option: DynamoDB table -->
<!-- explanation: Multi-AZ DB instance deployment duy trì standby đồng bộ để high availability/failover; read replica chủ yếu scale đọc và replication bất đồng bộ. -->
