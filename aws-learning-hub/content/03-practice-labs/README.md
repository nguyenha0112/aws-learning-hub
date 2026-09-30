# Practice Labs

Chỉ thực hành trong tài khoản sandbox; luôn cấu hình Budget trước khi tạo tài nguyên có phí.

## Lab 01 — Static website an toàn

Mục tiêu: upload site lên S3, phân phối qua CloudFront, giữ bucket không public trực tiếp.

Checklist: tạo bucket → bật versioning → upload → tạo CloudFront distribution với OAC → test URL → xóa tài nguyên sau lab.

## Lab 02 — Highly available web tier

Mục tiêu: vẽ/triển khai ALB + Auto Scaling Group trên ít nhất hai AZ.

Ghi lại: security group rules, health check path, scale metric, cách cleanup.

## Nhật ký lab

Tạo một file theo mẫu `lab-YYYY-MM-DD.md`: mục tiêu, architecture, lệnh/cấu hình, chi phí, lỗi gặp phải, bài học.
