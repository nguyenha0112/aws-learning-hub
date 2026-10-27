---
id: saa-kms-secrets
title: "SAA: KMS, Secrets Manager & Encryption"
domain: Security
duration_minutes: 45
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# KMS & Secrets Manager

KMS quản lý encryption keys. Secrets Manager lưu, kiểm soát quyền và có thể tự rotate credentials. Đề thi thường kiểm tra ai được phép dùng key, encryption at rest và cách tránh hard-code secrets.

| Nhu cầu | Dùng |
| --- | --- |
| Encrypt EBS/S3/RDS, audit key usage | AWS KMS |
| Lưu DB password/API key và tự rotation | Secrets Manager |
| Config không nhạy cảm hoặc secret đơn giản chi phí thấp | Systems Manager Parameter Store |

## KMS cần nhớ

- AWS managed key do AWS quản lý; customer managed key cho policy, rotation và quyền kiểm soát chi tiết hơn.
- Để dùng KMS key, principal cần được key policy và IAM policy cho phép (tùy cách policy thiết kế).
- Envelope encryption: KMS tạo/bảo vệ data key; app dùng data key để encrypt dữ liệu lớn.
- Copy snapshot mã hóa cross-Region cần key phù hợp ở Region đích.

## Scenario

RDS database password không được hard-code và phải tự đổi định kỳ: dùng Secrets Manager rotation (thường qua Lambda). Không trả password vào source code hoặc user data.

## Quiz
<!-- quiz: Ứng dụng cần lấy password RDS an toàn và password phải tự xoay vòng. Dịch vụ phù hợp nhất? -->
<!-- option: AWS KMS key policy -->
<!-- option: AWS Secrets Manager | correct -->
<!-- option: Amazon S3 versioning -->
<!-- option: AWS Artifact -->
<!-- explanation: Secrets Manager được thiết kế để lưu và rotate secrets; KMS bảo vệ encryption keys chứ không thay cơ chế quản lý credentials. -->
