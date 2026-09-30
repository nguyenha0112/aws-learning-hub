# Amazon CloudFront

## Mục đích

CDN phân phối content từ edge locations để giảm latency và giảm tải origin.

## Dùng khi nào

- Static site/assets trên S3.
- Cache API/public content gần user.
- Cần HTTPS, custom domain, DDoS protection cơ bản với AWS Shield Standard.

## Khái niệm

- **Distribution**: cấu hình CDN.
- **Origin**: nguồn dữ liệu như S3, ALB, API Gateway.
- **Cache behavior**: rule về path, method, cache policy.
- **OAC (Origin Access Control)**: CloudFront truy cập private S3 bucket an toàn.

## Scenario thi

Website toàn cầu chậm khi tải ảnh từ S3: dùng CloudFront với S3 origin. Không mở public bucket nếu có thể dùng OAC.
