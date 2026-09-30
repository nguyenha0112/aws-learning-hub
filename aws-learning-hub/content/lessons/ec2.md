---
id: ec2
title: "EC2: Compute có kiểm soát"
domain: Compute
duration_minutes: 40
level: Foundation
video_url: ""
published: true
---

# Mục tiêu học tập

- Biết khi nào chọn EC2 thay vì serverless/container.
- Hiểu AMI, instance type, EBS, Security Group và pricing.

## EC2 là gì?

EC2 là virtual server khi bạn cần kiểm soát operating system, runtime hoặc network ở mức máy chủ. AMI là template; instance type định nghĩa CPU, memory và network; EBS là persistent block storage.

## Availability và scale

Một instance không phải HA. Web tier production nên chạy trong Auto Scaling Group trải nhiều AZ và nằm sau Application Load Balancer. ASG giữ số instance tối thiểu/desired/max và thay instance lỗi.

## Pricing

On-Demand cho workload khó dự báo. Savings Plans cho sử dụng ổn định. Spot cho batch/CI/render chịu gián đoạn.

## Lab an toàn

1. Launch instance sandbox.
2. Chỉ dùng SSM Session Manager hoặc giới hạn SSH từ IP của bạn.
3. Gắn IAM role read-only S3.
4. Terminate instance, kiểm tra DeleteOnTermination của EBS.

## Quiz

<!-- quiz: Web tier cần tự thay instance lỗi và tăng instance khi traffic cao. Kiến trúc nào đúng? -->
<!-- option: Một EC2 instance lớn hơn -->
<!-- option: ALB + Auto Scaling Group đa AZ | correct -->
<!-- option: Tăng dung lượng EBS -->
<!-- explanation: ALB phân phối traffic còn ASG kiểm tra health, thay instance và scale capacity. -->
