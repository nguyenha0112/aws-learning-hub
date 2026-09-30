# Bài 01 — IAM: nền tảng bảo mật và phân quyền AWS

> Sau bài này, bạn phải giải thích được “ai đang gọi AWS, họ được phép làm gì, và vì sao request bị từ chối”. Đây là kiến thức xuất hiện gần như trong mọi lab và mọi đề thi AWS.

## 1. Mục tiêu học tập

Hoàn thành bài này, bạn có thể:

1. Phân biệt root user, IAM user, group, role và federation.
2. Đọc được policy JSON cơ bản.
3. Giải thích implicit deny, explicit allow và explicit deny.
4. Chọn đúng cách cấp quyền cho người dùng, EC2/Lambda và cross-account.
5. Thiết kế quyền theo least privilege mà không để lộ access key.

---

## 2. IAM giải quyết vấn đề gì?

Mỗi request đến AWS, ví dụ `s3:GetObject` hoặc `ec2:RunInstances`, đều cần được trả lời ba câu:

1. **Principal là ai?** Người dùng, role session, AWS service hay account khác?
2. **Họ muốn làm action nào?** Ví dụ đọc object hay xóa bucket.
3. **Trên resource nào, với điều kiện nào?** Bucket nào, Region nào, có bắt buộc MFA không?

IAM là lớp identity and access management trả lời các câu đó. Nó không phải firewall mạng; Security Group và NACL làm nhiệm vụ kiểm soát network traffic.

### Shared Responsibility Model với IAM

AWS chịu trách nhiệm bảo mật hạ tầng cloud. Bạn chịu trách nhiệm cấu hình identity, policy, MFA, rotation/loại bỏ credentials và quyền truy cập vào dữ liệu/tài nguyên của account.

---

## 3. Các loại danh tính

### 3.1 Root user

Root user được tạo cùng AWS account và có toàn quyền. Root không thể bị giới hạn bởi IAM policy thông thường.

Quy tắc thực hành:

- Bật MFA ngay sau khi tạo account.
- Không tạo access key cho root.
- Không dùng root cho công việc hằng ngày.
- Chỉ dùng khi cần thao tác account-level thật sự không thể làm bằng role.

### 3.2 IAM user

IAM user là identity dài hạn trong **một** AWS account, có thể có console password hoặc access key. Nó phù hợp cho trường hợp legacy/hệ thống đặc biệt, nhưng không phải lựa chọn đầu tiên cho nhân viên.

Với con người, ưu tiên AWS IAM Identity Center hoặc federation/SSO thay vì tạo user/password/access key lâu dài cho từng người.

### 3.3 IAM group

Group gom IAM users có cùng quyền. Group không phải identity để đăng nhập và cũng không lồng group vào group khác.

Ví dụ: `Developers` có policy đọc CloudWatch logs và deploy vào môi trường dev; user mới chỉ cần được thêm vào group.

### 3.4 IAM role

Role không đại diện cho một người cố định. Nó là bộ quyền **tạm thời** mà một trusted principal có thể assume để lấy temporary credentials từ AWS STS.

Các case quan trọng:

- EC2 role: ứng dụng trên EC2 đọc S3/DynamoDB.
- Lambda execution role: function ghi log CloudWatch hoặc gọi service khác.
- Cross-account role: developer từ account A assume role trong account B.
- Federated role: SSO/OIDC/SAML user vào AWS.

**Quy tắc vàng:** workload chạy trên AWS nên dùng role, không hard-code access key trong code, file `.env` hay AMI.

---

## 4. Policy JSON: ngôn ngữ cấp quyền

Policy là tài liệu JSON gồm các statement. Đây là ví dụ chỉ cho một role đọc object trong prefix `reports/`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadMonthlyReports",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::company-reports/reports/*"
    }
  ]
}
```

| Trường | Ý nghĩa |
|---|---|
| `Effect` | `Allow` hoặc `Deny` |
| `Action` | API actions được kiểm soát, ví dụ `s3:GetObject` |
| `Resource` | ARN của tài nguyên áp dụng |
| `Condition` | Điều kiện bổ sung, ví dụ bắt buộc MFA hoặc giới hạn source IP |
| `Principal` | Ai được áp dụng; xuất hiện trong resource-based policy và trust policy |

Đừng dùng `Action: "*"` và `Resource: "*"` trong production trừ khi có lý do rất rõ và đã được review.

---

## 5. IAM quyết định Allow hay Deny như thế nào?

Hãy nhớ thứ tự đơn giản này:

```text
Mặc định: implicit deny
      ↓
Có explicit Deny phù hợp? → DENY ngay
      ↓
Có explicit Allow phù hợp? → ALLOW
      ↓
Không có Allow → DENY
```

Một explicit deny luôn thắng allow. Ngoài identity policy còn có thể có resource policy, permissions boundary, session policy và Service Control Policy (SCP) của AWS Organizations. Khi troubleshoot `AccessDenied`, phải xem toàn bộ lớp policy liên quan.

### Ví dụ tư duy

Developer có `AdministratorAccess`, nhưng SCP của organization deny `ec2:TerminateInstances` ở production account. Kết quả vẫn là **Deny**, vì SCP guardrail giới hạn trần quyền cho account/OU.

---

## 6. Hai policy thường nhầm lẫn

### 6.1 Permission policy

Nói role/user **được làm gì**, ví dụ Lambda role được `s3:PutObject` vào bucket đích.

### 6.2 Trust policy

Nói **ai được assume role**. Ví dụ role Lambda trust `lambda.amazonaws.com`; role cho cross-account trust account/role bên ngoài.

Một role cần cả trust policy đúng lẫn permission policy đủ. Trust đúng nhưng không có permission thì assume được nhưng không làm được việc. Permission đúng nhưng trust sai thì không ai assume được role.

---

## 7. Mẫu kiến trúc thực tế

### Case A — Web app trên EC2 đọc S3

1. Tạo IAM role `WebAppRole` với minimal policy `s3:GetObject` cho đúng bucket/prefix.
2. Tạo instance profile và gắn role vào EC2.
3. AWS SDK lấy temporary credentials tự động từ role.
4. Không lưu access key trên instance.

### Case B — Lambda xử lý ảnh S3

Lambda execution role cần ít nhất quyền ghi CloudWatch Logs, đọc object nguồn và ghi thumbnail vào đúng bucket/prefix đích. S3 event chỉ là trigger; nó không tự cấp quyền S3 cho code Lambda.

### Case C — Đội audit từ account khác đọc log

Tạo role ở log account, trust principal audit account, cấp read-only policy có scope vào bucket logs. Auditor assume role để dùng temporary credentials, thay vì chia sẻ password hoặc access key.

---

## 8. Lab an toàn — cấp quyền đọc S3 bằng role

> Làm bằng sandbox, dùng bucket chứa file test, không dùng dữ liệu thật.

1. Tạo bucket private, ví dụ `your-name-iam-lab`.
2. Upload `hello.txt` vào prefix `training/`.
3. Tạo policy chỉ cho `s3:GetObject` với ARN `arn:aws:s3:::your-name-iam-lab/training/*`.
4. Tạo role cho EC2 và attach policy này.
5. Gắn role vào một EC2 sandbox (hoặc dùng IAM policy simulator nếu không tạo EC2).
6. Xác minh đọc object trong `training/` thành công; thử đọc prefix khác phải bị từ chối.
7. Xóa EC2/lab resources sau khi hoàn thành.

### Tiêu chí hoàn thành

Bạn có thể trả lời: “Vì sao role được đọc `training/hello.txt` nhưng không được xóa bucket?” — policy chỉ explicit allow `GetObject` trên resource có scope; mọi action khác implicit deny.

---

## 9. Lỗi thường gặp

| Lỗi | Cách sửa |
|---|---|
| Hard-code access key trong source code | Dùng IAM role và secret manager khi thật sự cần secret ngoài AWS |
| Dùng root để tạo tài nguyên | Tạo role/admin có MFA; cất root an toàn |
| Cấp `AdministratorAccess` để “chữa” AccessDenied | Dùng policy simulator/CloudTrail để tìm action-resource bị thiếu |
| Nhầm permission policy với trust policy | Kiểm tra cả “ai assume” và “role làm được gì” |
| Cấp quyền `s3:*` cho toàn account | Giới hạn action, bucket, prefix và condition theo nhu cầu |

---

## 10. Câu hỏi tự ôn

1. EC2 cần đọc S3, nên dùng IAM user access key hay role? Vì sao?
2. Policy A allow `s3:GetObject`, policy B deny cùng action/resource. Kết quả là gì?
3. Một role có trust policy cho Lambda nhưng không có quyền ghi CloudWatch Logs. Điều gì xảy ra?
4. SCP có cấp quyền cho user/role không?
5. Khi nào dùng resource-based policy như S3 bucket policy?

### Đáp án ngắn

1. Role; temporary credentials tự động, không lộ long-term key.
2. Deny, vì explicit deny thắng.
3. Lambda có thể assume role nhưng ghi log sẽ bị AccessDenied.
4. Không; SCP là guardrail giới hạn quyền tối đa, vẫn cần Allow ở policy phù hợp.
5. Khi cần cấp quyền trực tiếp trên resource, đặc biệt cross-account hoặc kiểm soát truy cập bucket.

---

## 11. Nguồn chính thức

- [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html)
- [IAM access management](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_access-management.html)
