---
id: vpc
title: "VPC: Mạng AWS từ gốc"
domain: Networking
duration_minutes: 50
level: Foundation
video_url: ""
published: true
---

# Mục tiêu học tập

- Thiết kế public/private subnet qua route table.
- Phân biệt Internet Gateway, NAT Gateway, Security Group và NACL.

## VPC là gì?

VPC là mạng riêng logic của bạn trong AWS. Bạn chọn CIDR, chia thành subnet theo Availability Zone, khai báo route và kiểm soát traffic. Mỗi VPC thuộc một Region; subnet thuộc đúng một Availability Zone.

Khi bắt đầu, hãy chọn CIDR đủ rộng để có chỗ mở rộng (ví dụ `10.0.0.0/16`) rồi phân bổ subnet theo vai trò và AZ, không chỉ theo từng ứng dụng. Route table quyết định packet đi đâu; Security Group/NACL quyết định traffic đó có được phép hay không.

<!-- section-quiz: VPC là gì? -->
<!-- question: VPC thuộc phạm vi nào trong AWS? -->
<!-- option: Một Availability Zone -->
<!-- option: Một Region | correct -->
<!-- option: Toàn bộ AWS account ở mọi Region -->
<!-- explanation: VPC là tài nguyên cấp Region; subnet mới là tài nguyên cấp Availability Zone. -->
<!-- /question -->
<!-- question: Subnet thuộc phạm vi nào? -->
<!-- option: Một Availability Zone | correct -->
<!-- option: Nhiều Availability Zone -->
<!-- option: Nhiều Region -->
<!-- explanation: Một subnet không thể trải qua nhiều AZ; thiết kế HA cần subnet tương ứng ở từng AZ. -->
<!-- /question -->
<!-- question: Thành phần nào quyết định next hop cho traffic trong VPC? -->
<!-- option: Route table | correct -->
<!-- option: IAM policy -->
<!-- option: AWS Budgets -->
<!-- explanation: Route table chứa các route và target/next hop của traffic. -->
<!-- /question -->
<!-- question: CIDR 10.0.0.0/16 chủ yếu thể hiện điều gì? -->
<!-- option: Dải địa chỉ IP của VPC | correct -->
<!-- option: Tên DNS của VPC -->
<!-- option: Loại Security Group -->
<!-- explanation: CIDR xác định không gian địa chỉ IP private có thể dùng trong VPC. -->
<!-- /question -->
<!-- question: Lý do nên chia subnet theo AZ là gì? -->
<!-- option: Tăng khả năng chịu lỗi khi một AZ có sự cố | correct -->
<!-- option: Làm IAM policy ngắn hơn -->
<!-- option: Không phải dùng route table -->
<!-- explanation: Các workload triển khai đa AZ tiếp tục phục vụ khi một AZ không sẵn sàng. -->
<!-- /question -->
<!-- /section-quiz -->

## Public và private subnet

Subnet có route đến Internet Gateway là public. Private subnet không có direct route đến IGW. Instance trong private subnet có thể ra Internet qua NAT Gateway đặt tại public subnet, nhưng Internet không thể tự mở kết nối vào instance đó.

Public subnet không đồng nghĩa mọi instance tự có Internet: instance vẫn cần public IPv4/EIP (hoặc IPv6 phù hợp), route tới IGW và Security Group cho phép traffic cần thiết. NAT Gateway dùng cho outbound IPv4 của private subnet; đặt NAT Gateway theo AZ để tránh single point of failure và chi phí cross-AZ không cần thiết.

<!-- section-quiz: Public và private subnet -->
<!-- question: Điều gì làm một subnet trở thành public subnet? -->
<!-- option: Có route mặc định tới Internet Gateway | correct -->
<!-- option: Có Security Group mở port 80 -->
<!-- option: Có NAT Gateway bên trong subnet đó -->
<!-- explanation: Route table có route tới IGW là dấu hiệu của public subnet. -->
<!-- /question -->
<!-- question: Private EC2 cần tải bản vá từ Internet qua IPv4. Giải pháp phù hợp là gì? -->
<!-- option: NAT Gateway ở public subnet và route private subnet tới NAT | correct -->
<!-- option: Gắn IGW trực tiếp vào EC2 -->
<!-- option: Mở inbound SSH từ 0.0.0.0/0 -->
<!-- explanation: NAT cho phép kết nối outbound từ private workload mà không nhận kết nối unsolicited inbound từ Internet. -->
<!-- /question -->
<!-- question: NAT Gateway nên đặt ở đâu để dùng Internet Gateway? -->
<!-- option: Public subnet | correct -->
<!-- option: Private database subnet -->
<!-- option: Bất kỳ subnet nào không cần route -->
<!-- explanation: NAT Gateway cần route tới Internet Gateway nên nằm ở public subnet. -->
<!-- /question -->
<!-- question: Internet có thể tự khởi tạo kết nối tới EC2 private subnet qua NAT Gateway không? -->
<!-- option: Không | correct -->
<!-- option: Có, nếu NACL allow all -->
<!-- option: Có, nếu route 0.0.0.0/0 tồn tại -->
<!-- explanation: NAT là luồng outbound và chỉ cho response của kết nối đã được khởi tạo từ bên trong. -->
<!-- /question -->
<!-- question: Tại sao production thường triển khai NAT Gateway theo từng AZ? -->
<!-- option: Tăng availability và giảm traffic cross-AZ | correct -->
<!-- option: Bắt buộc để dùng ALB -->
<!-- option: Để Security Group trở thành stateless -->
<!-- explanation: Mỗi private subnet route tới NAT cùng AZ sẽ giảm dependency và phí cross-AZ. -->
<!-- /question -->
<!-- /section-quiz -->

## Security Group và NACL

Security Group stateful và gắn vào resource/ENI. NACL stateless và gắn vào cả subnet. Thực tế, dùng Security Group làm lớp chính và NACL như defense-in-depth khi cần.

Với Security Group, response traffic tự động được cho phép nếu request ban đầu hợp lệ. Với NACL, bạn phải khai báo cả inbound lẫn outbound, bao gồm ephemeral ports cho traffic trả về. Quy tắc Security Group chỉ có `allow`; NACL có thể `allow` hoặc `deny` và rule number thấp hơn được xét trước.

<!-- section-quiz: Security Group và NACL -->
<!-- question: Security Group gắn với thành phần nào? -->
<!-- option: ENI/resource | correct -->
<!-- option: Toàn bộ Region -->
<!-- option: Route table -->
<!-- explanation: Security Group là firewall ở mức resource/ENI, không gắn trực tiếp vào subnet. -->
<!-- /question -->
<!-- question: Security Group là stateful có ý nghĩa gì? -->
<!-- option: Response cho traffic được phép sẽ tự được cho phép | correct -->
<!-- option: Phải tạo rule inbound và outbound giống nhau -->
<!-- option: Có rule deny explicit -->
<!-- explanation: Stateful tracking khiến return traffic không cần rule response riêng. -->
<!-- /question -->
<!-- question: NACL có đặc điểm nào? -->
<!-- option: Stateless và áp dụng ở subnet | correct -->
<!-- option: Stateful và áp dụng ở IAM user -->
<!-- option: Chỉ kiểm soát outbound traffic -->
<!-- explanation: NACL đánh giá từng chiều độc lập và áp dụng cho mọi resource trong subnet. -->
<!-- /question -->
<!-- question: Khi cần chặn một CIDR cụ thể ở mức subnet, công cụ phù hợp là gì? -->
<!-- option: NACL với rule deny | correct -->
<!-- option: Security Group rule deny -->
<!-- option: Route table local route -->
<!-- explanation: Security Group chỉ có allow rules; NACL hỗ trợ deny rule. -->
<!-- /question -->
<!-- question: Lớp kiểm soát chính cho một EC2 application thường là gì? -->
<!-- option: Security Group | correct -->
<!-- option: NACL duy nhất cho mọi rule ứng dụng -->
<!-- option: Internet Gateway -->
<!-- explanation: Security Group dễ quản lý theo workload và hỗ trợ tham chiếu SG-to-SG. -->
<!-- /question -->
<!-- /section-quiz -->

## Scenario kiến trúc

Website production: ALB ở public subnets của hai AZ; application EC2/ECS ở private subnets; RDS nằm trong private database subnets. App chỉ cho phép HTTP từ Security Group của ALB.

Luồng tham chiếu: Internet → ALB (public subnet) → application (private subnet) → RDS (private database subnet). Không mở database ra Internet. Thay vì allow một dải IP rộng, hãy dùng Security Group reference: application SG chỉ nhận từ ALB SG; database SG chỉ nhận cổng database từ application SG.

<!-- section-quiz: Scenario kiến trúc -->
<!-- question: Thành phần nào phù hợp đặt ở public subnet trong web architecture phổ biến? -->
<!-- option: Application Load Balancer | correct -->
<!-- option: RDS database -->
<!-- option: Backend application chỉ phục vụ nội bộ -->
<!-- explanation: ALB nhận traffic từ Internet; backend và database giữ private để giảm bề mặt tấn công. -->
<!-- /question -->
<!-- question: Rule inbound tốt nhất cho application Security Group là gì? -->
<!-- option: Cho phép HTTP/HTTPS từ ALB Security Group | correct -->
<!-- option: Cho phép HTTP từ 0.0.0.0/0 trực tiếp tới app -->
<!-- option: Cho phép database port từ Internet -->
<!-- explanation: Tham chiếu SG của ALB giữ app không exposed trực tiếp ra Internet. -->
<!-- /question -->
<!-- question: Database Security Group nên cho phép inbound từ đâu? -->
<!-- option: Application Security Group trên đúng database port | correct -->
<!-- option: 0.0.0.0/0 trên mọi port -->
<!-- option: Internet Gateway -->
<!-- explanation: Database chỉ nhận kết nối từ tier ứng dụng cần thiết. -->
<!-- /question -->
<!-- question: Lợi ích của ALB ở hai AZ là gì? -->
<!-- option: Phân phối traffic và tăng khả năng chịu lỗi | correct -->
<!-- option: Thay thế Security Group -->
<!-- option: Tạo IAM users tự động -->
<!-- explanation: ALB đa AZ route tới target healthy và cải thiện availability. -->
<!-- /question -->
<!-- question: Thành phần nào không nên public trực tiếp trong kiến trúc này? -->
<!-- option: RDS database | correct -->
<!-- option: Internet-facing ALB -->
<!-- option: Internet Gateway -->
<!-- explanation: Database nằm private subnet và không nhận kết nối trực tiếp từ Internet. -->
<!-- /question -->
<!-- /section-quiz -->

## Lab an toàn

1. Vẽ VPC hai AZ với public và private subnet.
2. Tạo IGW, NAT Gateway và route tables.
3. Mô tả inbound/outbound rules trước khi deploy.

## Quiz

<!-- quiz: EC2 private subnet cần tải update từ Internet. Chọn giải pháp nào? -->
<!-- option: Gắn Internet Gateway trực tiếp vào EC2 -->
<!-- option: NAT Gateway ở public subnet và route private subnet tới NAT | correct -->
<!-- option: Mở inbound SSH từ 0.0.0.0/0 -->
<!-- explanation: NAT cho private workload outbound Internet mà không mở unsolicited inbound traffic. -->
