# AWS Lambda

## Lambda là gì?

Compute serverless để chạy code khi có event hoặc theo lịch. Bạn trả tiền theo số lần gọi và thời gian chạy; AWS quản lý server, OS và scaling.

## Dùng khi nào

- Xử lý event từ S3, EventBridge, SQS, DynamoDB Streams.
- API nhỏ qua API Gateway.
- Tác vụ theo lịch, automation, ETL ngắn.
- Workload không liên tục hoặc khó dự báo traffic.

## Không phù hợp khi

- Ứng dụng cần process chạy liên tục, kết nối lâu, hoặc kiểm soát OS.
- Tác vụ vượt giới hạn thời gian Lambda (tối đa 15 phút).
- Cần GPU hay cấu hình máy chủ đặc biệt: xem EC2/ECS/EKS.

## Khái niệm cần nhớ

- **Invocation**: event gọi function.
- **Execution role**: IAM role cấp quyền cho code Lambda gọi AWS services.
- **Concurrency**: số function instance chạy đồng thời; reserved concurrency giúp cô lập capacity.
- **Cold start**: độ trễ khi AWS tạo execution environment mới.
- **DLQ / on-failure destination**: nơi nhận event xử lý thất bại.

## Scenario thi

Ảnh được upload S3, cần tạo thumbnail tự động: S3 event → Lambda → lưu thumbnail sang bucket/prefix khác. Không cần chạy EC2 liên tục.
