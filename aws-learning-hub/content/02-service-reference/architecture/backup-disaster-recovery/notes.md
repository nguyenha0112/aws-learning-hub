# Backup và Disaster Recovery (DR)

## Mục tiêu

- **RPO (Recovery Point Objective)**: có thể mất tối đa bao nhiêu dữ liệu.
- **RTO (Recovery Time Objective)**: mất tối đa bao lâu để khôi phục dịch vụ.

RPO/RTO càng thấp thì chi phí và độ phức tạp thường càng cao.

## Bốn chiến lược DR phổ biến

| Chiến lược | Ý tưởng | RTO/RPO tương đối |
|---|---|---|
| Backup & restore | Backup sang Region khác, dựng lại khi cần | Cao hơn |
| Pilot light | Thành phần dữ liệu cốt lõi luôn sẵn sàng | Trung bình |
| Warm standby | Bản sao thu nhỏ đang chạy | Thấp hơn |
| Multi-site active-active | Nhiều Region cùng phục vụ traffic | Thấp nhất, tốn nhất |

## Dịch vụ/hành động thường gặp

- EBS snapshots, RDS automated backups/snapshots.
- S3 Cross-Region Replication cho object cần bản sao Region khác.
- Route 53 failover routing + health checks để chuyển traffic.
- Infrastructure as Code (CloudFormation/Terraform) để dựng lại môi trường có thể lặp lại.

## Cách chọn trong đề thi

Đọc RTO/RPO trước, sau đó chọn chiến lược đơn giản nhất đáp ứng yêu cầu. Không chọn multi-Region active-active nếu đề chỉ yêu cầu backup định kỳ và RTO vài giờ.
