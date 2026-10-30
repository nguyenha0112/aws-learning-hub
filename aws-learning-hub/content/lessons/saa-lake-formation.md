---
id: saa-lake-formation
title: "SAA: Lake Formation & Data Lake Governance"
domain: Analytics
duration_minutes: 35
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Lake Formation

Lake Formation quản trị fine-grained permissions trong data lake, thường kết hợp S3, Glue Data Catalog và Athena/Redshift Spectrum.

| Requirement | Dịch vụ |
| --- | --- |
| Lưu dữ liệu vật lý | S3 |
| Metadata/schema | Glue Data Catalog |
| Transform | Glue ETL |
| SQL trên S3 | Athena |
| Quyền table/column data lake | Lake Formation |

Partition dữ liệu và dùng Parquet giúp Athena scan ít dữ liệu hơn, thường giảm chi phí query.

## Quiz
<!-- quiz: Analyst chỉ được xem một số columns trong table data lake trên S3. Dịch vụ governance phù hợp? -->
<!-- option: AWS Lake Formation | correct -->
<!-- option: Amazon CloudFront -->
<!-- option: AWS Global Accelerator -->
<!-- option: Amazon EC2 Auto Scaling -->
<!-- explanation: Lake Formation hỗ trợ centralized, fine-grained permissions cho tables/columns trong data lake. -->
