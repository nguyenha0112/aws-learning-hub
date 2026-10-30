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

## Thành phần

- **Accelerator**: hai static anycast IP.
- **Listener**: protocol/port TCP hoặc UDP.
- **Endpoint group**: Region, traffic dial và health configuration.
- **Endpoint**: ALB, NLB, EC2 hoặc Elastic IP.

Client kết nối một static IP; traffic vào AWS global backbone rồi được đưa tới endpoint khỏe. Điều này thường failover nhanh hơn DNS vì client không phải chờ TTL.

## Phân biệt dịch vụ

| Requirement | Chọn |
| --- | --- |
| TCP/UDP global, static IP, network acceleration | Global Accelerator |
| HTTP(S) edge caching | CloudFront |
| DNS weighted/failover/latency policy | Route 53 |

Global Accelerator không thay ALB/NLB: nó đưa traffic đến endpoint, load balancer vẫn thực hiện distribution L7/L4. Chọn nó cho gaming, VoIP hoặc allow-list static IP; không chọn chỉ vì cần cache website.

## Quiz
<!-- quiz: Game TCP toàn cầu cần hai static IP và latency ổn định qua AWS backbone. Dịch vụ phù hợp nhất? -->
<!-- option: Amazon CloudFront -->
<!-- option: AWS Global Accelerator | correct -->
<!-- option: Route 53 geolocation chỉ riêng nó -->
<!-- option: Amazon EFS -->
<!-- explanation: Global Accelerator cung cấp static anycast IP và định tuyến traffic TCP/UDP qua AWS global network đến endpoint khỏe. -->
