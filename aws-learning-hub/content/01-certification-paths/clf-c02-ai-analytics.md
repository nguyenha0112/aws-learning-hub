---
id: clf-c02-ai-analytics
title: "AI, ML & Analytics Services (CLF-C02)"
domain: Cloud Technology
duration_minutes: 45
level: Foundation
video_url: ""
published: true
---

# AI, ML & Analytics — keyword map cho CLF-C02

## AI/ML services thường gặp

| Bài toán | Service |
|---|---|
| Foundation models / generative AI | Amazon Bedrock |
| Product/content recommendation | Amazon Personalize |
| Text to speech | Amazon Polly |
| Chatbot voice/text | Amazon Lex |
| Extract text/tables từ tài liệu | Amazon Textract |

Đề CLF-C02 thường kiểm tra mapping bài toán → service, không yêu cầu bạn tự train model. Đọc keyword: "recommendation" → Personalize; "speech from text" → Polly; "OCR/table from document" → Textract; "foundation model" → Bedrock.

## Analytics services thường gặp

| Bài toán | Service |
|---|---|
| Query SQL trực tiếp dữ liệu S3 | Amazon Athena |
| Serverless ETL/data integration | AWS Glue |
| Spark/Hadoop big data cluster | Amazon EMR |
| Streaming data real time | Amazon Kinesis |
| Business intelligence dashboard | Amazon QuickSight |

## Scenario

Business analyst cần query CSV/Parquet trên S3 bằng SQL mà không provision database: Athena. Cần transform data catalog/ETL serverless: Glue. Cần dashboard cho business user: QuickSight. Cần tiếp nhận stream click events: Kinesis.

## Quiz

<!-- quiz: Service nào cho phép query SQL trực tiếp trên dữ liệu lưu trong S3? -->
<!-- option: Amazon Athena | correct -->
<!-- option: Amazon EMR -->
<!-- option: Amazon Personalize -->
<!-- explanation: Athena là serverless query service cho dữ liệu trong S3; EMR chạy framework big data, Personalize làm recommendation. -->
