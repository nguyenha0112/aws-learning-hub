# AWS Identity and Access Management (IAM)

## Mục đích

Quản lý ai được xác thực và họ được phép làm gì trong AWS.

## Thành phần

- **User**: danh tính dài hạn cho người hoặc legacy workload.
- **Group**: tập user có chung quyền.
- **Role**: quyền tạm thời được assume bởi AWS service, user hoặc account khác.
- **Policy**: JSON định nghĩa Allow/Deny trên action và resource.

## Best practices

- Bật MFA, không dùng root user thường xuyên.
- Least privilege; cấp quyền theo role thay vì access key lâu dài.
- Dùng IAM Identity Center cho workforce khi phù hợp.
- Explicit Deny luôn thắng Allow.
