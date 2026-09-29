# Amazon EC2

## Dùng khi nào

Chạy workload cần toàn quyền hệ điều hành, phần mềm đặc thù, hoặc thời gian chạy dài/ổn định.

## Khái niệm cần nhớ

- **AMI**: mẫu tạo instance.
- **Instance type**: chọn CPU/RAM/network (general, compute, memory, storage optimized).
- **Security Group**: stateful firewall gắn ENI/instance.
- **EBS**: block storage bền vững; snapshot lưu trên S3 nội bộ AWS.
- **Auto Scaling Group**: giữ số instance mong muốn và scale theo metric.
- **ELB**: phân phối traffic; ALB cho HTTP(S), NLB cho TCP/UDP hiệu năng cao.

## Quyết định thi hay gặp

Multi-AZ + ALB + ASG cho web HA. Dùng Spot cho workload chịu gián đoạn; Reserved Instances/Savings Plans cho tải ổn định.
