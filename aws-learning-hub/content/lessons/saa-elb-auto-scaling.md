---
id: saa-elb-auto-scaling
title: "SAA: Elastic Load Balancing & Auto Scaling"
domain: Compute
duration_minutes: 45
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# ELB & Auto Scaling

ELB phân phối traffic, Auto Scaling thay đổi số EC2 theo nhu cầu. Trong đề SAA, hai dịch vụ này thường đi cùng để tạo kiến trúc highly available và elastic.

| Yêu cầu | Chọn |
| --- | --- |
| HTTP/HTTPS, path/host routing, WebSocket | Application Load Balancer (ALB) |
| TCP/UDP, static IP, cực thấp latency | Network Load Balancer (NLB) |
| Legacy Layer 4/7 đơn giản | Classic Load Balancer (legacy) |

## Điểm thi quan trọng

- ALB là Layer 7 và có thể route `/api` đến target group A, `/images` đến target group B.
- NLB là Layer 4; hỗ trợ static/Elastic IP và preserve source IP.
- Target group có health check; instance unhealthy không nhận request.
- Auto Scaling Group trải trên nhiều AZ, dùng launch template và thay instance không healthy.
- Target tracking là cách đơn giản để giữ metric, ví dụ average CPU 50%.

## Scenario

Ứng dụng web tăng traffic vào giờ cao điểm, cần tự thêm EC2 ở nhiều AZ và chỉ gửi HTTPS traffic đến instance khỏe: dùng ALB public + ASG multi-AZ + health checks.

## Quiz
<!-- quiz: Một ứng dụng cần route /payments và /catalog đến hai nhóm EC2 khác nhau qua HTTPS. Dịch vụ load balancer phù hợp nhất? -->
<!-- option: Network Load Balancer -->
<!-- option: Application Load Balancer | correct -->
<!-- option: Gateway Load Balancer -->
<!-- option: Amazon Route 53 failover record -->
<!-- explanation: ALB hoạt động Layer 7 và hỗ trợ host/path-based routing tới nhiều target groups. -->
