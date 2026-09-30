# Amazon SQS và Amazon SNS

## SQS: queue để tách rời hệ thống

Producer gửi message vào queue; consumer poll và xử lý. Dùng để buffer tải, retry, và không bắt producer chờ consumer.

- Standard queue: at-least-once, có thể out-of-order.
- FIFO queue: ordering theo message group, exactly-once processing trong phạm vi cơ chế FIFO.
- Visibility timeout: tạm ẩn message khi consumer đang xử lý.
- DLQ: nhận message thất bại nhiều lần.

## SNS: publish/subscribe

Publisher gửi một message đến topic; SNS fan-out đến nhiều subscriber (SQS, Lambda, email, HTTP...).

## Chọn nhanh

| Cần | Dùng |
|---|---|
| Đệm công việc giữa producer/consumer | SQS |
| Broadcast event tới nhiều subscriber | SNS |
| Fan-out bền vững | SNS → nhiều SQS queues |
