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

## Quiz
<!-- quiz: Một catalog cần search theo từ khóa, typo và relevance gần thời gian thực. Chọn dịch vụ nào? -->
<!-- option: Amazon RDS Multi-AZ -->
<!-- option: Amazon OpenSearch Service | correct -->
<!-- option: Amazon S3 Standard -->
<!-- option: AWS Glue Crawler -->
<!-- explanation: OpenSearch được tối ưu cho indexing và full-text search, không phải OLTP database chính. -->
