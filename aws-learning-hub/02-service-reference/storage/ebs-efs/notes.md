# Amazon EBS và Amazon EFS

## Chọn loại storage bằng câu hỏi

| Cần gì? | Dùng gì? |
|---|---|
| Disk block gắn vào EC2 | EBS |
| File system Linux dùng chung cho nhiều compute instance | EFS |
| Object, static assets, archive | S3 |

## Amazon EBS

EBS là persistent block storage cho EC2. Volume thường thuộc một Availability Zone và được attach vào instance trong AZ đó. Có thể tạo **snapshot** để backup/khôi phục/copy volume; snapshot được AWS quản lý bền vững.

- Dùng cho boot volume, database volume, hoặc application cần block device.
- `DeleteOnTermination` cần được xem xét để tránh xóa volume dữ liệu khi EC2 bị terminate.
- EBS encryption tích hợp KMS; snapshot từ volume mã hóa cũng được mã hóa.

## Amazon EFS

EFS là file system NFS elastic, managed, có thể mount từ nhiều EC2 ở nhiều AZ trong cùng Region/VPC. Dùng cho shared web content, home directory hoặc workload Linux cần file system dùng chung.

- Mount target được tạo trong các subnet/AZ truy cập.
- Security group của mount target phải cho phép NFS (TCP 2049) từ client.
- EFS tự tăng/giảm dung lượng theo dữ liệu, không phải provision filesystem size trước.

## Scenario và bẫy thi

**Nhiều EC2 web server cần cùng đọc/ghi file upload:** EFS, không phải EBS riêng lẻ.

**Database trên một EC2 cần volume bền vững, độ trễ thấp:** EBS.

**Cần lấy snapshot EBS sang Region khác:** copy snapshot sang Region đích rồi tạo volume/AMI tùy nhu cầu.
