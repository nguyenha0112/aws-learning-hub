---
id: saa-observability-operations
title: "SAA: CloudWatch & Systems Manager"
domain: Management
duration_minutes: 40
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Observability & operations

| Requirement | Dịch vụ |
| --- | --- |
| Metrics, logs, alarms, dashboard | CloudWatch |
| Ai gọi AWS API nào | CloudTrail |
| Inventory, patch, Run Command | Systems Manager |
| Config/secret đơn giản | Parameter Store |

CloudWatch Alarm có thể trigger Auto Scaling hoặc SNS. Systems Manager Session Manager cho phép truy cập EC2 audited mà không cần mở inbound SSH, khi agent/role/network đã được chuẩn bị phù hợp.

## Phân biệt chính xác

- **CloudWatch**: metrics, logs, dashboard, alarm và Logs Insights.
- **CloudTrail**: lịch sử API call — ai đã làm thay đổi gì.
- **AWS Config**: configuration history và đánh giá compliance của resource.
- **Systems Manager**: vận hành fleet — Run Command, Patch Manager, Session Manager, Automation.

## Private operations pattern

EC2 private subnet cài SSM Agent và instance role. Admin dùng Session Manager; không cần public IP/bastion/port 22 nếu network path hoặc SSM interface endpoints được cấu hình. CloudWatch Alarm có thể scale ASG hoặc gửi SNS; CloudTrail có thể phải bật data events riêng tùy use case.

## Bẫy SAA

Parameter Store lưu config/secret đơn giản (SecureString dùng KMS) nhưng không tự rotate database credentials như Secrets Manager. Config không giám sát CPU; CloudWatch không cho biết principal nào gọi API DeleteBucket.

## Quiz
<!-- quiz: Cần patch và chạy command trên hàng trăm EC2 mà không mở port 22 inbound. Chọn gì? -->
<!-- option: Amazon Inspector -->
<!-- option: AWS Systems Manager | correct -->
<!-- option: AWS CloudTrail -->
<!-- option: Amazon Route 53 -->
<!-- explanation: Systems Manager cung cấp Run Command, Patch Manager và Session Manager để vận hành fleet tập trung. -->
