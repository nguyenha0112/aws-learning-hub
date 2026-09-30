# Elastic Load Balancing (ELB) và EC2 Auto Scaling

## Bài toán giải quyết

Một website production cần vừa chịu được traffic tăng, vừa không chết khi một EC2 instance hoặc một Availability Zone có sự cố.

Kiến trúc thường gặp:

`Internet → Application Load Balancer → Auto Scaling Group → EC2 instances (ít nhất 2 AZ)`

## Elastic Load Balancing

Load balancer là điểm vào chung cho client. Nó nhận request và phân phối đến các **targets** trong target group; listener và listener rule quyết định cách route request.

| Loại | Khi chọn |
|---|---|
| Application Load Balancer (ALB) | HTTP/HTTPS, routing theo host/path/header, microservices/web app |
| Network Load Balancer (NLB) | TCP/UDP/TLS, hiệu năng cao, IP tĩnh |
| Gateway Load Balancer (GWLB) | Triển khai/chèn network appliance, ví dụ firewall |

ALB cần đặt trong ít nhất hai AZ cho production; mỗi target group cần health check phù hợp, chẳng hạn `/health`.

## EC2 Auto Scaling Group (ASG)

ASG duy trì số EC2 instance trong giới hạn **minimum**, **desired** và **maximum**. Nếu instance không khỏe, ASG có thể thay thế nó. Launch template là mẫu để ASG tạo instance nhất quán.

### Scaling policies

- **Target tracking**: giữ metric gần một target, ví dụ CPU trung bình 50% hoặc `ALBRequestCountPerTarget`.
- **Step scaling**: thêm/bớt capacity theo mức độ alarm bị vượt.
- **Scheduled scaling**: scale theo lịch biết trước.

Với target tracking, AWS quản lý các CloudWatch alarm liên quan. Đừng tự sửa/xóa các alarm này.

## Scenario và bẫy thi

**Website cần HA và traffic thay đổi:** ALB đa AZ + ASG đa AZ + target tracking. Không dùng một EC2 duy nhất.

**Cần route `/api` và `/images` tới hai nhóm backend:** ALB listener rules theo path.

**Cần IP tĩnh và TCP throughput cao:** ưu tiên NLB, không phải ALB.

## Tự kiểm tra

1. Thành phần nào kiểm tra target có khỏe không? → Load balancer target group health check.
2. Multi-AZ của ASG đem lại gì? → giảm single point of failure theo AZ.
3. ASG scale dựa vào số request mỗi target? → `ALBRequestCountPerTarget` với target tracking.
