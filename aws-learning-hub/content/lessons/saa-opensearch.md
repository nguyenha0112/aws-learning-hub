---
id: saa-opensearch
title: "SAA: Amazon OpenSearch Service"
domain: Analytics
duration_minutes: 30
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Amazon OpenSearch Service

OpenSearch phù hợp full-text search, log analytics và near-real-time search/dashboard. Nó không phải transactional source of truth.

| Requirement | Chọn |
| --- | --- |
| Full-text/fuzzy product search | OpenSearch |
| Query ad-hoc dữ liệu S3 | Athena |
| Data warehouse BI | Redshift |

Đặt OpenSearch trong VPC khi cần private access; kiểm soát IAM/resource policy và encryption. Snapshot là cơ chế backup/restore index.

## Cách hoạt động

Application hoặc log pipeline đưa document vào **index**. Mapping/analyzer quyết định field được token hóa và search thế nào; shard/replica ảnh hưởng capacity, availability và chi phí. Ingestion có thể đi qua Lambda, Firehose, agent hoặc application.

## Chọn đúng service

| Requirement | Chọn |
| --- | --- |
| Full-text, fuzzy search, relevance | OpenSearch |
| SQL ad-hoc trên S3 | Athena |
| Warehouse BI/OLAP | Redshift |
| OLTP transaction | RDS/Aurora |

## Security & bẫy thi

VPC deployment, security groups, access policy và encryption là các điểm hay gặp. OpenSearch không thay transactional database; DynamoDB/RDS có thể là source of truth còn OpenSearch là search index. “Search logs near-real-time” thường OpenSearch, còn historical log tại S3 bằng SQL thường Athena.

## Quiz
<!-- quiz: Một catalog cần search theo từ khóa, typo và relevance gần thời gian thực. Chọn dịch vụ nào? -->
<!-- option: Amazon RDS Multi-AZ -->
<!-- option: Amazon OpenSearch Service | correct -->
<!-- option: Amazon S3 Standard -->
<!-- option: AWS Glue Crawler -->
<!-- explanation: OpenSearch được tối ưu cho indexing và full-text search, không phải OLTP database chính. -->
