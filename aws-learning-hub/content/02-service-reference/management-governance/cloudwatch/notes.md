# Amazon CloudWatch

## Mục đích

Quan sát vận hành qua metrics, logs, alarms, dashboards và events.

## Phân biệt nhanh

- **Metrics**: số liệu theo thời gian, ví dụ CPUUtilization hoặc NumberOfMessagesVisible.
- **Logs**: dòng log ứng dụng/hệ thống; Lambda tự gửi log vào CloudWatch Logs khi có quyền.
- **Alarm**: hành động/cảnh báo khi metric vượt ngưỡng.
- **Dashboard**: xem nhiều metric trên một màn hình.
- **CloudWatch Events / EventBridge**: phản ứng với event hoặc lịch; EventBridge là hướng hiện đại hơn.

## Scenario thi

CPU EC2 cao liên tục, cần tăng instance tự động: CloudWatch alarm → Auto Scaling policy. Cần biết ai xóa security group: CloudTrail, không phải CloudWatch.
