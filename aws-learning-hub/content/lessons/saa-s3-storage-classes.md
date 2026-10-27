---
id: saa-s3-storage-classes
title: "SAA: S3 Storage Classes & Lifecycle"
domain: Storage
duration_minutes: 35
level: Associate
course_id: aws-solutions-architect-associate
published: true
---

# S3 Storage Classes

Chọn lớp S3 theo tần suất truy cập, tốc độ khôi phục và yêu cầu chịu lỗi Availability Zone.

| Tình huống | Lựa chọn SAA |
| --- | --- |
| Truy cập thường xuyên | S3 Standard |
| Không đoán được access pattern | Intelligent-Tiering |
| Ít truy cập nhưng lấy ngay | Standard-IA |
| Có thể tạo lại dữ liệu, chấp nhận mất một AZ | One Zone-IA |
| Archive nhưng lấy ngay | Glacier Instant Retrieval |
| Archive, chờ phút đến giờ | Glacier Flexible Retrieval |
| Compliance/lưu rất lâu, rẻ nhất | Glacier Deep Archive |

## Bẫy hay gặp

- Standard-IA và One Zone-IA đều có retrieval fee; One Zone-IA chỉ ở một AZ.
- Glacier Instant Retrieval đọc được ngay; Flexible và Deep Archive cần restore.
- Intelligent-Tiering phù hợp khi access pattern không biết trước và có phí monitoring/automation nhỏ.
- Lifecycle có thể tự chuyển tier hoặc xóa object hết hạn.

## Lifecycle ví dụ

`Day 0: Standard → Day 30: Standard-IA → Day 90: Glacier Flexible Retrieval → Year 7: delete`

## Quiz
<!-- quiz: Dữ liệu archive hiếm truy cập nhưng ứng dụng vẫn phải đọc ngay với độ trễ milliseconds. Chọn lớp nào? -->
<!-- option: S3 Glacier Flexible Retrieval -->
<!-- option: S3 Glacier Instant Retrieval | correct -->
<!-- option: S3 Glacier Deep Archive -->
<!-- option: S3 One Zone-IA -->
<!-- explanation: Glacier Instant Retrieval dành cho archive hiếm truy cập nhưng vẫn truy xuất milliseconds; Flexible và Deep Archive cần restore. -->
