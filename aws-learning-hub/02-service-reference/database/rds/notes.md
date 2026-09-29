# Amazon RDS và Aurora

## Dùng khi nào

Chọn RDS/Aurora khi cần database quan hệ, SQL, joins, transaction ACID và muốn AWS vận hành patching/backup/failover.

## Cần nhớ

- **RDS** hỗ trợ các engine phổ biến như MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.
- **Aurora** tương thích MySQL/PostgreSQL, là engine cloud-native của AWS.
- **Multi-AZ**: standby đồng bộ cho high availability/failover; không dùng để scale read.
- **Read replica**: bản sao bất đồng bộ để scale truy vấn đọc; có thể promote độc lập.
- **Automated backups**: phục hồi point-in-time trong retention period.
- **Encryption at rest**: bật khi tạo database; dùng KMS.

## Thiết kế cơ bản

App ở private subnet truy cập RDS trong DB subnet group (ít nhất hai AZ). Không public RDS trừ trường hợp rất đặc biệt. Dùng Secrets Manager để lưu credential và Security Group để giới hạn traffic database.

## So sánh nhanh

| Nhu cầu | Lựa chọn |
|---|---|
| HA database quan hệ | RDS Multi-AZ / Aurora |
| Nhiều read request | Read replicas |
| Serverless NoSQL | DynamoDB |
| Cache giảm tải DB | ElastiCache |
