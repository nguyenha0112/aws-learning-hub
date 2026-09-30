---
id: iam
title: "IAM: Bảo mật và phân quyền AWS"
domain: Security
duration_minutes: 45
level: Foundation
video_url: ""
published: true
---

# Mục tiêu học tập

- Phân biệt root user, IAM user, group, role và policy.
- Giải thích implicit deny, explicit allow và explicit deny.
- Dùng IAM role thay cho access key dài hạn.

## IAM giải quyết vấn đề gì?

Mỗi request AWS đều có một principal, action và resource. IAM quyết định request đó có được phép hay không. IAM **không** phải network firewall; Security Group và NACL mới kiểm soát network traffic.

## Danh tính và role

Root user có toàn quyền: bật MFA, không dùng thường ngày và không tạo root access key. IAM user là identity dài hạn, phù hợp legacy. IAM group gom users có chung quyền. IAM role là quyền tạm thời mà EC2, Lambda, SSO user hoặc account khác có thể assume.

> Quy tắc vàng: ứng dụng chạy trong AWS phải dùng role và temporary credentials, không hard-code access key.

## Đọc policy

Mặc định, request là implicit deny. Một explicit Allow đúng action/resource có thể cho phép. Một explicit Deny phù hợp luôn thắng bất kỳ Allow nào. Policy cần scope theo Action, Resource và Condition thay vì dùng `*` vô tội vạ.

## Scenario kiến trúc

EC2 cần đọc ảnh trong một S3 prefix: gắn instance profile có role chỉ allow `s3:GetObject` tại prefix đó. Không lưu credential trong source code hoặc instance.

## Lab an toàn

1. Tạo S3 bucket private và upload `training/hello.txt`.
2. Tạo policy chỉ cho `s3:GetObject` tại `training/*`.
3. Dùng IAM Policy Simulator hoặc EC2 role để kiểm tra allow/deny.
4. Xóa resource sandbox khi hoàn thành.

## Lỗi thường gặp

- Cấp AdministratorAccess để chữa AccessDenied: thay vào đó kiểm tra policy evaluation, resource ARN và SCP.
- Nhầm trust policy (ai assume role) với permission policy (role làm được gì).

## Quiz

<!-- quiz: EC2 cần đọc object S3. Cách cấp quyền nào phù hợp nhất? -->
<!-- option: Tạo root access key trong source code -->
<!-- option: Gắn IAM role vào EC2 instance profile | correct -->
<!-- option: Mở public toàn bộ S3 bucket -->
<!-- explanation: IAM role cấp temporary credentials tự động và tránh lộ long-term key. -->
