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

## Data lake flow

`S3 raw → Glue Crawler/Catalog → Glue ETL → S3 curated Parquet → Athena`. Lake Formation nằm ở lớp governance để cấp quyền database/table/column. Crawler chỉ discover schema và partition metadata; nó không tự convert CSV sang Parquet.

## Tối ưu và governance

Athena tính phí theo dữ liệu scan. Partition theo ngày/region, dùng Parquet/ORC và chỉ query columns cần thiết để giảm cost. Lake Formation không thay S3: S3 là storage vật lý; thiết kế quyền cần xét Lake Formation, IAM và S3 access pattern.

## Scenario

Logs CSV S3 có PII, analyst chỉ được xem một số columns: crawler tạo catalog, Glue job tạo curated Parquet, Lake Formation grant column permissions và Athena query curated dataset.

## Quiz
<!-- quiz: Analyst chỉ được xem một số columns trong table data lake trên S3. Dịch vụ governance phù hợp? -->
<!-- option: AWS Lake Formation | correct -->
<!-- option: Amazon CloudFront -->
<!-- option: AWS Global Accelerator -->
<!-- option: Amazon EC2 Auto Scaling -->
<!-- explanation: Lake Formation hỗ trợ centralized, fine-grained permissions cho tables/columns trong data lake. -->
