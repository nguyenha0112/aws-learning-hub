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

## Kiến trúc cần hiểu

`ECR → task definition → ECS service → task/container`. Service giữ desired count, thay task lỗi và có thể gắn target group của ALB. Task definition là blueprint chứa image, port, CPU/memory, environment, log configuration, secret reference và IAM task role.

- **Task execution role**: pull image ECR, ghi CloudWatch Logs.
- **Task role**: quyền runtime cho application, ví dụ đọc S3/DynamoDB.
- Với `awsvpc`, task có ENI và security group riêng.

## Khi nào chọn gì?

| Dấu hiệu đề | Đáp án |
| --- | --- |
| AWS-native containers, vận hành đơn giản | ECS |
| Không muốn quản EC2/node | ECS on Fargate |
| Cần Kubernetes, Helm hoặc K8s ecosystem | EKS |
| Job event-driven ngắn, code đơn giản | Lambda |
| Batch container dài/phức tạp | ECS/Fargate hoặc AWS Batch |

## Scenario & bẫy thi

API Docker có traffic HTTP biến động: đặt image ở ECR, chạy ECS service trên Fargate/private subnet, ALB public route traffic, autoscaling theo CPU/request và task role đọc secrets. Fargate là **compute engine**, không phải orchestrator; EKS vẫn đòi hỏi hiểu node/pod networking. Nếu private task cần Internet hoặc AWS API, hãy xét NAT Gateway hay VPC endpoints.

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
