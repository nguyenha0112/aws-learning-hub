# AWS CloudTrail

## CloudTrail là gì?

CloudTrail ghi lại activity/API calls trong AWS account. Đây là công cụ audit: ai làm gì, bằng identity nào, ở thời điểm nào và từ đâu.

## Event history và trail

- **Event history**: xem 90 ngày management events gần nhất trong một Region của account.
- **Trail**: ghi events liên tục tới S3 (và có thể CloudWatch Logs) để lưu giữ/lập cảnh báo/điều tra dài hạn.
- **Management events**: thao tác quản trị resource, ví dụ `CreateBucket`, `DeleteSecurityGroup`.
- **Data events**: thao tác dữ liệu số lượng lớn như S3 object-level hay Lambda invocation; cần cấu hình vì có thể phát sinh chi phí.

## Scenario và bẫy thi

**Ai xóa security group?** → CloudTrail, lọc management event.

**Cần giữ audit log nhiều năm và không sửa được log dễ dàng:** organization trail hoặc multi-Region trail → S3 bucket bảo mật, retention/lifecycle và kiểm soát quyền nghiêm ngặt.

**CPU instance tăng cao?** → CloudWatch metrics, không phải CloudTrail.

## Tự kiểm tra

1. CloudTrail theo dõi API activity hay performance metrics? → API activity.
2. Muốn lưu dài hơn event history? → tạo trail tới S3.
3. S3 `GetObject` là management hay data event? → data event.
