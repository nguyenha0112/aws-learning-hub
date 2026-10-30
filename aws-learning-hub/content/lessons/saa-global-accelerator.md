---
id: saa-global-accelerator
title: "SAA: AWS Global Accelerator"
domain: Networking
duration_minutes: 25
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# AWS Global Accelerator

Global Accelerator cung cấp static anycast IP và đưa TCP/UDP traffic vào AWS global network đến endpoint khỏe, như ALB, NLB hoặc EC2 ở nhiều Region.

| Requirement | Chọn |
| --- | --- |
| Global TCP/UDP, static IP | Global Accelerator |
| HTTP(S) edge cache | CloudFront |
| DNS policy/canary | Route 53 |

Global Accelerator không cache objects như CloudFront; nó tăng performance/failover ở network layer.

## Quiz
<!-- quiz: Game TCP toàn cầu cần hai static IP và latency ổn định qua AWS backbone. Dịch vụ phù hợp nhất? -->
<!-- option: Amazon CloudFront -->
<!-- option: AWS Global Accelerator | correct -->
<!-- option: Route 53 geolocation chỉ riêng nó -->
<!-- option: Amazon EFS -->
<!-- explanation: Global Accelerator cung cấp static anycast IP và định tuyến traffic TCP/UDP qua AWS global network đến endpoint khỏe. -->
