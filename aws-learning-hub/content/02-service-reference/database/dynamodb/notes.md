# Amazon DynamoDB

## Dùng khi nào

Database NoSQL serverless cho workload cần độ trễ thấp ở quy mô lớn, schema linh hoạt và access pattern rõ ràng.

## Khái niệm cốt lõi

- Table chứa items; item gồm attributes.
- **Partition key** xác định partition; chọn key phân bố đều để tránh hot partition.
- **Sort key** cho phép nhóm và truy vấn theo thứ tự trong cùng partition key.
- **GSI** cho access pattern khác partition key gốc.
- **On-demand** hợp tải khó dự báo; **provisioned** có thể kinh tế hơn khi tải ổn định.
- **DynamoDB Streams** phát event khi dữ liệu đổi, thường kích hoạt Lambda.
- TTL tự động xóa dữ liệu hết hạn (không ngay lập tức).

## Scenario thi

Lưu session/cart/profile ở quy mô lớn với latency ms: DynamoDB. Cần query bằng nhiều thuộc tính: thiết kế key/GSI trước, không “join” như RDS.
