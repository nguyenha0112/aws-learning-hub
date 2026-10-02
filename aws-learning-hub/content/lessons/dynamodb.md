---
id: dynamodb
title: "DynamoDB: Thiết kế NoSQL theo access pattern"
domain: Database
duration_minutes: 60
level: Associate
video_url: ""
published: true
---

# Mục tiêu học tập

- Biết khi nào DynamoDB phù hợp hơn RDS.
- Thiết kế partition key, sort key và GSI từ access pattern.

## DynamoDB là gì?

DynamoDB là database NoSQL managed/serverless cho workload cần độ trễ thấp ở quy mô lớn. Table chứa items; item chứa attributes. Thay vì thiết kế trước theo tables/joins, hãy liệt kê các access pattern rồi chọn key/index đáp ứng query đó.

## Primary key và data distribution

Partition key quyết định nơi DynamoDB lưu item. Chọn key có giá trị phân bố tốt để tránh hot partition. Sort key cho phép nhóm và query theo thứ tự trong cùng partition key, ví dụ tất cả order của một customer theo thời gian.

## Query trước, Scan sau

`Query` sử dụng primary key hoặc index và là cách đọc mục tiêu. `Scan` duyệt dữ liệu rộng hơn, chỉ dùng có chủ đích. Nếu ứng dụng cần query bằng thuộc tính khác key gốc, tạo Global Secondary Index (GSI) với alternate partition/sort key. GSI cập nhật bất đồng bộ và có thể trả dữ liệu eventually consistent.

## Capacity và events

On-demand phù hợp workload mới/khó dự báo; provisioned phù hợp tải đã biết và tối ưu chi phí. DynamoDB Streams phát sự kiện khi item thay đổi, thường kết hợp Lambda để làm side effect như cập nhật search index hoặc audit.

## Scenario kiến trúc

Lưu shopping cart/session ở quy mô lớn: table dùng `USER#id` làm partition key, sort key theo loại entity. Cần tìm đơn theo trạng thái: thiết kế GSI status + created timestamp trước khi build. Không cố join/scans toàn table như RDS.

## Lab an toàn

1. Viết ba access patterns trước khi tạo table.
2. Tạo table có partition/sort key phù hợp, thêm data test.
3. Thực hành Query theo key; thêm GSI cho access pattern thứ hai.
4. Bật Streams và xem Lambda event mẫu nếu có sandbox.

## Lỗi thường gặp

- Chọn partition key có ít giá trị (ví dụ `status`) gây hot partition.
- Bắt đầu với Scan khi thiếu access pattern/index.
- Quên GSI replication có thể eventually consistent.

## Quiz

<!-- quiz: Cần query orders theo status và thời gian, nhưng base table key là customer ID + order time. Cách thiết kế phù hợp? -->
<!-- option: Scan toàn table mỗi lần -->
<!-- option: Tạo GSI với status làm partition key và thời gian làm sort key | correct -->
<!-- option: Thêm read replica cho DynamoDB -->
<!-- explanation: GSI cho một access pattern alternate key; Scan không hiệu quả cho query thường xuyên trên table lớn. -->
