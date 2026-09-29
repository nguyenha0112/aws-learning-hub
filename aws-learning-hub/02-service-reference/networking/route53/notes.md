# Amazon Route 53

## Mục đích

DNS managed, domain registration và health checks của AWS.

## Routing policies

- **Simple**: một record hoặc nhiều record không health check.
- **Weighted**: chia traffic theo tỷ lệ; canary/blue-green.
- **Latency-based**: đưa người dùng đến Region có độ trễ thấp.
- **Failover**: active-passive, cần health check.
- **Geolocation/Geoproximity**: điều hướng theo vị trí địa lý.
- **Multivalue answer**: trả nhiều IP khỏe, không thay thế load balancer.

## Điều cần nhớ

Alias record trỏ đến tài nguyên AWS như ALB, CloudFront, S3 website; không tính phí DNS query như CNAME và có thể dùng ở zone apex.
