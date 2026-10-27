---
id: saa-glue
title: "SAA: AWS Glue ETL & Data Catalog"
domain: Analytics
duration_minutes: 35
level: Associate
course_id: aws-solutions-architect-associate
published: true
---

# AWS Glue

Glue là dịch vụ serverless cho ETL: extract, transform, load. Nó thường nằm giữa raw data và analytics trên S3, Athena, Redshift hoặc data lake.

| Thành phần | Vai trò |
| --- | --- |
| Glue Crawler | Quét S3/RDS, suy luận schema |
| Glue Data Catalog | Lưu metadata: table, schema, partition, location |
| Glue ETL Job | Transform/load bằng serverless Spark hoặc Python shell |

## Chọn dịch vụ đúng

- Transform dữ liệu, CSV sang Parquet, partition dữ liệu: **Glue**.
- Chỉ SQL trực tiếp trên S3: **Athena**.
- Data warehouse analytics lớn: **Redshift**.
- Migrate database ít downtime: **DMS**.
- Streaming ingestion: **Kinesis**.

## Scenario

CSV/JSON logs trong S3 cần phát hiện schema, đổi thành Parquet và query với Athena: Glue Crawler tạo catalog rồi Glue ETL Job transform vào curated S3 zone.

## Quiz
<!-- quiz: Công ty có file CSV trong S3, cần tự khám phá schema và tạo metadata table để Athena query. Chọn thành phần nào? -->
<!-- option: AWS Glue Crawler | correct -->
<!-- option: Amazon Redshift -->
<!-- option: AWS DMS -->
<!-- option: Amazon Kinesis Data Streams -->
<!-- explanation: Glue Crawler quét nguồn dữ liệu, suy luận schema và tạo/cập nhật metadata trong Glue Data Catalog cho Athena. -->
