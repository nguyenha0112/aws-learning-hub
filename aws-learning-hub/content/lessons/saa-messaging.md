---
id: saa-messaging
title: "SAA: SQS, SNS & EventBridge"
domain: Integration
duration_minutes: 50
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Decoupling: SQS, SNS & EventBridge

Các câu hỏi yêu cầu loose coupling, chống spike traffic hoặc fan-out thường cần SQS/SNS/EventBridge.

| Requirement | Dùng |
| --- | --- |
| Buffer queue, consumer xử lý theo tốc độ riêng | SQS |
| Một message gửi đến nhiều subscriber | SNS topic |
| Route event theo rule, SaaS/AWS events, event bus | EventBridge |
| Giữ message lỗi để phân tích | Dead-Letter Queue (DLQ) |

## SQS cần nhớ

- Standard queue: at-least-once delivery, best-effort ordering; consumer phải idempotent.
- FIFO queue: ordering theo message group, exactly-once processing semantics; throughput thấp hơn Standard.
- Visibility timeout: message tạm ẩn khi consumer xử lý; nếu không delete nó có thể được giao lại.
- Long polling giảm empty responses và chi phí.

## Fan-out scenario

Order được tạo cần thông báo email, cập nhật analytics, và xử lý fulfillment độc lập: publish vào SNS topic, mỗi workflow nhận từ SQS queue riêng. Như vậy consumer chậm không làm ảnh hưởng consumer khác.

## Quiz
<!-- quiz: Một hệ thống cần nhận event từ nhiều AWS service rồi route theo nội dung event đến Lambda hoặc SaaS target. Chọn dịch vụ nào? -->
<!-- option: Amazon SQS FIFO queue -->
<!-- option: Amazon EventBridge | correct -->
<!-- option: Amazon EFS -->
<!-- option: AWS KMS -->
<!-- explanation: EventBridge là event bus có rule-based routing cho AWS events, ứng dụng riêng và đối tác/SaaS. -->
