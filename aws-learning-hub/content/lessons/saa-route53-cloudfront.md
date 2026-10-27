---
id: saa-route53-cloudfront
title: "SAA: Route 53, CloudFront & Global Delivery"
domain: Networking
duration_minutes: 45
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# Route 53 & CloudFront

Route 53 xử lý DNS, health check và routing policy. CloudFront cache và phân phối nội dung từ edge locations gần người dùng.

| Requirement | Dịch vụ/cơ chế |
| --- | --- |
| Static/dynamic content global, giảm latency | CloudFront |
| DNS routing theo latency hoặc geolocation | Route 53 routing policy |
| Active-passive DR DNS | Route 53 failover + health check |
| Chỉ CloudFront được đọc S3 origin | Origin Access Control (OAC) |

## Routing policies cần nhớ

- **Simple**: một record đơn giản, không health check.
- **Weighted**: chia traffic theo tỉ lệ/canary deployment.
- **Latency**: đưa user đến Region latency thấp nhất.
- **Failover**: active-passive khi health check primary lỗi.
- **Geolocation/Geoproximity**: theo vị trí user hoặc resource.

## Bẫy hay gặp

- CloudFront không thay Route 53; CloudFront là CDN, Route 53 là DNS.
- Alias record trỏ trực tiếp AWS resource (ALB, CloudFront, S3 website) và không tính phí DNS query.
- Dùng OAC thay vì public S3 bucket khi CloudFront là đường truy cập duy nhất.

## Quiz
<!-- quiz: Site tĩnh S3 cần phục vụ toàn cầu, cache tại edge và bucket không được public. Kiến trúc tốt nhất? -->
<!-- option: Public S3 bucket + Route 53 simple record -->
<!-- option: CloudFront với S3 origin và Origin Access Control | correct -->
<!-- option: NLB trước S3 bucket -->
<!-- option: AWS Global Accelerator thay S3 bucket policy -->
<!-- explanation: CloudFront cung cấp edge cache; OAC cho phép bucket chỉ chấp nhận truy cập từ CloudFront. -->
