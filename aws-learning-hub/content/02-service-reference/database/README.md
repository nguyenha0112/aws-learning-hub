# Database

Thêm ghi chú theo mẫu service cho các dịch vụ sau khi học:

- **RDS/Aurora**: relational database managed; Multi-AZ cho HA, read replica để scale read.
- **DynamoDB**: NoSQL key-value/document, serverless, độ trễ thấp.
- **ElastiCache**: cache in-memory (Redis/Memcached).

Mẹo thi: dữ liệu quan hệ + giao dịch phức tạp thường hướng đến RDS/Aurora; workload serverless ở scale lớn với access pattern rõ thường hướng đến DynamoDB.
