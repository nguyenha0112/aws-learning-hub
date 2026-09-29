# Flashcards AWS

## Security

**Hỏi:** Workload chạy trên EC2 cần truy cập S3, dùng gì?  
**Đáp:** IAM role gắn vào EC2 instance profile.

**Hỏi:** Điều gì thắng mọi Allow trong IAM?  
**Đáp:** Explicit Deny.

## Networking

**Hỏi:** Private subnet ra Internet để tải update bằng gì?  
**Đáp:** NAT Gateway/NAT instance và route phù hợp.

**Hỏi:** SG hay NACL là stateful?  
**Đáp:** Security Group.

## Storage & Compute

**Hỏi:** Chống xóa nhầm object S3?  
**Đáp:** Versioning; Object Lock nếu cần retention bất biến.

**Hỏi:** Web tier cần HA và tự scale?  
**Đáp:** ALB + Auto Scaling Group đa AZ.
