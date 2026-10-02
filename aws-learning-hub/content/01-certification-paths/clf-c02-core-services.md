---
id: clf-c02-core-services
title: "Core Services & Global Infrastructure (CLF-C02)"
domain: Cloud Technology
duration_minutes: 65
level: Foundation
video_url: ""
published: true
---

# Core Services & Global Infrastructure — ôn CLF-C02

## Global Infrastructure

**Region** là khu vực địa lý AWS độc lập. **Availability Zone (AZ)** là một hoặc nhiều data center độc lập trong Region, tách biệt về điện, mạng và cooling. Thiết kế đa AZ tăng availability trong một Region. **Edge Locations/Points of Presence** phục vụ CloudFront để phân phối content gần người dùng và giảm latency.

## Compute

- **EC2**: virtual server, cần kiểm soát OS/runtime.
- **Lambda**: serverless, chạy code theo event, không quản server.
- **ECS/EKS**: chạy và quản lý container; EKS dùng Kubernetes.
- **Elastic Beanstalk**: PaaS, deploy code còn AWS điều phối nhiều hạ tầng bên dưới.

## Storage

| Nhu cầu | Service |
|---|---|
| Object: file, image, backup, static asset | S3 |
| Block disk gắn EC2 | EBS |
| Shared Linux file system cho nhiều EC2 | EFS |
| Archive ít truy cập, chi phí thấp | S3 Glacier storage classes |

S3 nổi bật với object durability 99.999999999% (11 nines). S3 không phải file system POSIX; hãy chọn EFS nếu nhiều Linux instance cần mount cùng thư mục.

## Database và Networking

RDS/Aurora cho relational SQL; DynamoDB cho NoSQL serverless/key-value latency thấp; ElastiCache dùng in-memory cache (Redis/Memcached). VPC là mạng ảo riêng; Security Group là stateful firewall ở resource/instance; NACL là stateless firewall ở subnet. Route 53 là DNS; Direct Connect là private dedicated connection từ on-premises tới AWS; CloudFront là CDN.

## Scenario

Website toàn cầu tải ảnh chậm: S3 origin + CloudFront. Nhiều EC2 cần shared upload directory: EFS. On-premises cần đường truyền private, ổn định hơn public Internet: Direct Connect. Cần DNS/routing domain: Route 53.

## Quiz

<!-- quiz: Nhiều EC2 Linux cần cùng mount một thư mục file dùng chung. Chọn service nào? -->
<!-- option: Amazon EBS -->
<!-- option: Amazon EFS | correct -->
<!-- option: Amazon S3 Glacier -->
<!-- explanation: EFS là managed elastic NFS file system có thể được nhiều instance mount; EBS là block storage, Glacier là archive storage. -->
