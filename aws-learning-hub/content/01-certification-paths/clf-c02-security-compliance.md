---
id: clf-c02-security-compliance
title: "Security & Compliance (CLF-C02)"
domain: Security
duration_minutes: 55
level: Foundation
video_url: ""
published: true
---

# Security & Compliance — ôn CLF-C02

## Mục tiêu

- Phân định chính xác trách nhiệm AWS và khách hàng.
- Chọn dịch vụ security/compliance theo keyword trong đề.
- Phân biệt IAM, KMS, Secrets Manager, WAF, Shield, GuardDuty và Inspector.

## Shared Responsibility Model

AWS chịu trách nhiệm **Security OF the Cloud**: data center, physical server, physical network, hypervisor và hạ tầng nền của cloud. Khách hàng chịu trách nhiệm **Security IN the Cloud**: dữ liệu, IAM, cấu hình service, firewall và encryption theo workload.

Ví dụ quan trọng: AWS bảo vệ phần cứng nền tảng; khách hàng vá OS của EC2, cấu hình Security Group/NACL, quản lý quyền IAM và phân loại/bảo vệ dữ liệu của mình. Với managed service, phần AWS vận hành tăng lên, nhưng khách hàng vẫn chịu trách nhiệm dữ liệu và access control.

## Identity và quyền truy cập

IAM quản lý user, group, role và policy. Least privilege là nguyên tắc chỉ cấp đúng action/resource cần thiết. Bật MFA và không dùng root user cho việc hằng ngày. Workload EC2/Lambda dùng IAM role/temporary credentials thay vì access key cố định.

## Chọn dịch vụ theo tình huống

| Keyword trong đề | Service phù hợp |
|---|---|
| DDoS protection | AWS Shield |
| Chặn SQL injection, XSS tại HTTP/HTTPS | AWS WAF |
| Encryption keys | AWS KMS |
| Database password/API key, automatic rotation | AWS Secrets Manager |
| Compliance reports, agreements | AWS Artifact |
| Threat detection từ log/activity | Amazon GuardDuty |
| Scan vulnerability EC2, container, Lambda | Amazon Inspector |
| Quét PII/sensitive data trong S3 | Amazon Macie |
| Ai gọi API nào | AWS CloudTrail |

## Scenario

Một web application bị SQL injection và XSS: đặt AWS WAF trước ALB/CloudFront/API Gateway. Một hệ thống cần lưu DB credentials và tự xoay vòng: dùng Secrets Manager, không hard-code mật khẩu. Khi auditor cần tải SOC/ISO report của AWS: dùng Artifact.

## Lab an toàn

1. Bật MFA cho root user (không chia sẻ MFA/secret).
2. Tạo IAM policy read-only có scope vào test bucket.
3. Mở CloudTrail Event history và tìm một API call sandbox.
4. Dùng Security Hub/Inspector/GuardDuty trial chỉ khi biết rõ chi phí và cách cleanup.

## Quiz

<!-- quiz: Dịch vụ nào lưu database password và có thể tự động rotate credential? -->
<!-- option: AWS KMS -->
<!-- option: AWS Secrets Manager | correct -->
<!-- option: Amazon GuardDuty -->
<!-- explanation: Secrets Manager được dùng cho secrets như DB password/API key và hỗ trợ rotation; KMS quản lý encryption keys. -->
