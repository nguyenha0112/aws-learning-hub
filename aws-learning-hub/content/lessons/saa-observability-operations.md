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

## Quiz
<!-- quiz: Cần patch và chạy command trên hàng trăm EC2 mà không mở port 22 inbound. Chọn gì? -->
<!-- option: Amazon Inspector -->
<!-- option: AWS Systems Manager | correct -->
<!-- option: AWS CloudTrail -->
<!-- option: Amazon Route 53 -->
<!-- explanation: Systems Manager cung cấp Run Command, Patch Manager và Session Manager để vận hành fleet tập trung. -->
