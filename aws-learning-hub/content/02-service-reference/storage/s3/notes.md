# Amazon S3

## Dùng khi nào

Object storage: static website, log, backup, data lake, media.

## Cần nhớ

- Bucket có tên unique toàn cục; object nằm trong bucket.
- Mặc định S3 chặn public access; dùng IAM/bucket policy để kiểm soát.
- Versioning bảo vệ trước xóa/ghi đè nhầm.
- Lifecycle chuyển object sang storage class rẻ hơn hoặc hết hạn.
- Encryption: SSE-S3, SSE-KMS hoặc client-side.

## Storage classes (rút gọn)

Standard cho truy cập thường xuyên; Intelligent-Tiering khi pattern không rõ; Standard-IA/One Zone-IA cho ít truy cập; Glacier cho archive.
