# Amazon VPC

## Mục đích

Mạng ảo cô lập cho tài nguyên AWS.

## Sơ đồ tư duy

`VPC → Availability Zone → Subnet → Route table`

- Public subnet: route tới Internet Gateway; resource vẫn cần public IP/EIP để ra/vào Internet.
- Private subnet: không có direct route tới IGW; dùng NAT Gateway để outbound Internet.
- NACL: stateless, áp dụng tại subnet.
- Security Group: stateful, áp dụng tại ENI/resource.

## Câu hỏi hay gặp

Instance private cần tải package từ Internet: NAT Gateway (ở public subnet) + route từ private subnet tới NAT.
