---
id: vpc
title: "VPC: Mạng AWS từ gốc"
domain: Networking
duration_minutes: 50
level: Foundation
video_url: ""
published: true
---

# Mục tiêu học tập

- Thiết kế public/private subnet qua route table.
- Phân biệt Internet Gateway, NAT Gateway, Security Group và NACL.

## VPC là gì?

VPC là mạng riêng logic của bạn trong AWS. Bạn chọn CIDR, chia thành subnet theo Availability Zone, khai báo route và kiểm soát traffic.

## Public và private subnet

Subnet có route đến Internet Gateway là public. Private subnet không có direct route đến IGW. Instance trong private subnet có thể ra Internet qua NAT Gateway đặt tại public subnet, nhưng Internet không thể tự mở kết nối vào instance đó.

## Security Group và NACL

Security Group stateful và gắn vào resource/ENI. NACL stateless và gắn vào cả subnet. Thực tế, dùng Security Group làm lớp chính và NACL như defense-in-depth khi cần.

## Scenario kiến trúc

Website production: ALB ở public subnets của hai AZ; application EC2/ECS ở private subnets; RDS nằm trong private database subnets. App chỉ cho phép HTTP từ Security Group của ALB.

## Lab an toàn

1. Vẽ VPC hai AZ với public và private subnet.
2. Tạo IGW, NAT Gateway và route tables.
3. Mô tả inbound/outbound rules trước khi deploy.

## Quiz

<!-- quiz: EC2 private subnet cần tải update từ Internet. Chọn giải pháp nào? -->
<!-- option: Gắn Internet Gateway trực tiếp vào EC2 -->
<!-- option: NAT Gateway ở public subnet và route private subnet tới NAT | correct -->
<!-- option: Mở inbound SSH từ 0.0.0.0/0 -->
<!-- explanation: NAT cho private workload outbound Internet mà không mở unsolicited inbound traffic. -->
