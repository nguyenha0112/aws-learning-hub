---
id: aws-core-services-summary
title: "AWS Core Services Summary (Practitioner & SAA)"
domain: Foundation
duration_minutes: 60
level: Foundation
published: true
---

# Tổng hợp các Dịch vụ Cốt lõi của AWS / AWS Core Services Summary

*(Nhấn nút Language ở góc trên màn hình để chuyển đổi ngôn ngữ giao diện)*

## 1. Compute (Điện toán)
**Amazon EC2 (Elastic Compute Cloud):**
*   **VN:** Máy chủ ảo trên mây. Bạn có toàn quyền kiểm soát hệ điều hành. Phù hợp cho các ứng dụng web tĩnh, web động, xử lý batch.
*   **EN:** Virtual servers in the cloud. You have full control over the OS. Suitable for web apps, batch processing.

**AWS Lambda:**
*   **VN:** Dịch vụ Serverless (không máy chủ). Chỉ chạy code khi có sự kiện (event) kích hoạt. Tính tiền theo mili-giây.
*   **EN:** Serverless compute service. Runs code in response to events. Billed per millisecond.

**Amazon ECS & EKS:**
*   **VN:** Quản lý Container. ECS là giải pháp nội bộ của AWS, EKS dùng Kubernetes mã nguồn mở. Cả hai đều có thể dùng Fargate (Serverless cho container).
*   **EN:** Container orchestration. ECS is AWS-native, EKS uses Kubernetes. Both can run on Fargate (Serverless compute for containers).

## 2. Storage (Lưu trữ)
**Amazon S3 (Simple Storage Service):**
*   **VN:** Lưu trữ đối tượng (Object Storage). Phù hợp lưu trữ file, hình ảnh, video, log, backup. Rất rẻ và bền bỉ (99.999999999% durability).
*   **EN:** Object storage. Ideal for files, images, videos, logs, and backups. Extremely durable.

**Amazon EBS (Elastic Block Store):**
*   **VN:** Lưu trữ khối (Block Storage). Ổ cứng mạng gắn trực tiếp vào máy chủ EC2. Cần thiết cho hệ điều hành và database.
*   **EN:** Block storage network drive attached to EC2 instances. Required for OS and databases.

**Amazon EFS (Elastic File System):**
*   **VN:** Hệ thống file dùng chung (File Storage). Nhiều máy chủ EC2 (hệ điều hành Linux) có thể đọc/ghi cùng một lúc.
*   **EN:** Shared network file system for Linux EC2 instances. Multiple instances can read/write simultaneously.

## 3. Database (Cơ sở dữ liệu)
**Amazon RDS (Relational Database Service):**
*   **VN:** CSDL quan hệ có quản lý (SQL). Hỗ trợ MySQL, PostgreSQL, Oracle, SQL Server, Aurora. AWS lo việc backup và patch lỗi.
*   **EN:** Managed relational database (SQL). Supports MySQL, PostgreSQL, Oracle, SQL Server, Aurora.

**Amazon DynamoDB:**
*   **VN:** CSDL phi quan hệ (NoSQL). Tốc độ cực nhanh (millisecond), có thể mở rộng vô hạn. Cấu trúc Key-Value.
*   **EN:** Fast, scalable NoSQL key-value database. Millisecond latency at any scale.

## 4. Networking (Mạng)
**Amazon VPC (Virtual Private Cloud):**
*   **VN:** Trung tâm mạng ảo của bạn trên AWS. Giúp cô lập tài nguyên, cấu hình Subnet, Route Table, Security Group.
*   **EN:** Your private virtual network on AWS. Isolates resources, configures Subnets, Route Tables, and Security Groups.

**Amazon Route 53:**
*   **VN:** Dịch vụ DNS toàn cầu cực kỳ ổn định. Giúp định tuyến tên miền (domain) đến các dịch vụ AWS.
*   **EN:** Highly available and scalable Cloud Domain Name System (DNS) web service.

---

## Quiz
<!-- quiz: Dịch vụ lưu trữ nào phù hợp nhất để làm ổ đĩa hệ điều hành (OS Boot Drive) cho một máy chủ ảo EC2? -->
<!-- option: Amazon S3 -->
<!-- option: Amazon EFS -->
<!-- option: Amazon EBS | correct -->
<!-- option: Amazon DynamoDB -->
<!-- explanation: Amazon EBS cung cấp block storage (lưu trữ khối), đây là định dạng bắt buộc để cài đặt hệ điều hành và dùng làm ổ đĩa boot cho EC2. S3 là Object Storage, không thể boot OS. -->
