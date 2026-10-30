---
id: saa-containers
title: "SAA: ECS, Fargate & EKS"
domain: Compute
duration_minutes: 45
level: Associate
course_id: aws-solutions-architect-associate
video_url: ""
published: true
---

# ECS, Fargate & EKS

| Requirement | Chọn |
| --- | --- |
| Container, không quản node EC2 | ECS on Fargate |
| AWS-native container orchestration | ECS |
| Kubernetes ecosystem/APIs | EKS |

ECS task definition mô tả image, CPU/memory, networking, logging và IAM task role. Fargate là compute serverless cho ECS/EKS. Dùng task role thay vì access key trong image/container.

## Bẫy SAA

- EKS vẫn là Kubernetes; tính cả worker nodes hoặc Fargate profiles.
- Lambda không thay container khi job chạy dài hoặc cần runtime đặc thù.
- ECR là nơi lưu container images.

## Quiz
<!-- quiz: Công ty muốn chạy Docker container nhưng không muốn quản lý EC2 instances hoặc Kubernetes nodes. Đáp án phù hợp nhất? -->
<!-- option: Amazon EC2 Auto Scaling -->
<!-- option: Amazon ECS on AWS Fargate | correct -->
<!-- option: Amazon EKS managed node group bắt buộc -->
<!-- option: AWS Lambda layer -->
<!-- explanation: Fargate chạy ECS tasks mà không cần quản lý server/node; ECS vẫn quản lý task orchestration. -->
