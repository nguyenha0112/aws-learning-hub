---
id: lambda
title: "AWS Lambda: Serverless theo sự kiện"
domain: Compute
duration_minutes: 50
level: Foundation
video_url: ""
published: true
---

# Mục tiêu học tập

- Chọn Lambda đúng lúc thay vì EC2 hoặc container.
- Hiểu event source, execution role, concurrency, retry và lỗi xử lý bất đồng bộ.

## Lambda giải quyết vấn đề gì?

Lambda chạy code khi có event hoặc theo lịch. AWS quản lý server, capacity và scaling; bạn tập trung vào function, configuration và quyền truy cập. Lambda phù hợp với workload ngắn, event-driven, traffic biến động hoặc automation.

## Khi nào dùng và khi nào không?

Dùng Lambda để xử lý S3 upload, API nhỏ qua API Gateway, SQS worker, DynamoDB Streams, EventBridge schedule và automation. Không chọn nó cho process cần chạy liên tục, kết nối dài, quyền kiểm soát OS/GPU hoặc job vượt giới hạn thời gian chạy Lambda (tối đa 15 phút).

## Execution role và event source

Event source kích hoạt function, nhưng không tự cấp quyền cho code. Lambda execution role cần các action tối thiểu: ghi CloudWatch Logs, đọc object nguồn, ghi result đích hoặc nhận message queue. Luôn giới hạn Resource theo bucket/prefix/table thực tế.

## Concurrency và xử lý lỗi

Concurrency là số execution environment chạy song song. Reserved concurrency dùng để cô lập capacity hoặc hạn chế function làm quá tải downstream database. Với event bất đồng bộ, cần thiết kế retry và destination/DLQ để giữ event thất bại phục vụ điều tra; với SQS, visibility timeout và DLQ phải phù hợp với thời gian function xử lý.

## Scenario kiến trúc

Người dùng upload ảnh: S3 event → Lambda thumbnail function → bucket đích. Function role chỉ đọc source prefix và ghi destination prefix; lỗi xử lý được quan sát trong CloudWatch Logs và chuyển sang failure destination khi cần.

## Lab an toàn

1. Tạo hai S3 prefix `uploads/` và `thumbnails/` trong sandbox bucket.
2. Tạo Lambda đơn giản log event và cấp execution role tối thiểu.
3. Tạo S3 event notification cho `uploads/`.
4. Upload test object, xem CloudWatch Logs và xóa resource sau khi học.

## Lỗi thường gặp

- Nhét access key vào environment variable thay vì dùng role.
- Không giới hạn concurrency khi downstream RDS/API có capacity thấp.
- Không có DLQ/destination nên event lỗi bị khó điều tra.

## Quiz

<!-- quiz: Ảnh upload vào S3 cần tạo thumbnail tự động, không cần server chạy liên tục. Giải pháp phù hợp nhất? -->
<!-- option: Một EC2 instance luôn chạy để poll S3 -->
<!-- option: S3 event kích hoạt Lambda với execution role giới hạn | correct -->
<!-- option: Lưu ảnh vào RDS Multi-AZ -->
<!-- explanation: Lambda phù hợp xử lý ngắn theo event; S3 event trigger function và IAM role cấp quyền tối thiểu. -->
