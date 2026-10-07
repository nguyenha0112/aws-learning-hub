---
id: clf-c02-cloud-concepts
title: "Cloud Concepts & Pricing (CLF-C02)"
domain: Cloud Concepts
duration_minutes: 45
level: Foundation
published: true
---

# Khái niệm Đám mây & Tính cước phí (Cloud Concepts & Pricing)

## 1. Cloud Concepts (Khái niệm Đám mây)

**The 6 Advantages of Cloud Computing (6 Lợi ích của Điện toán Đám mây):**
1. **Trade capital expense for variable expense (Đổi chi phí cố định lấy chi phí biến đổi):**
   * **VN:** Không cần mua máy chủ vật lý đắt đỏ, chỉ trả tiền cho những gì bạn sử dụng (Pay-as-you-go).
   * **EN:** Pay on-demand instead of massive upfront hardware investments (Capex to Opex).
2. **Benefit from massive economies of scale (Hưởng lợi từ lợi thế kinh tế theo quy mô):**
   * **VN:** Hàng trăm ngàn khách hàng dùng chung nền tảng AWS giúp AWS giảm chi phí và chia sẻ lại giá rẻ hơn cho bạn.
   * **EN:** Usage from hundreds of thousands of customers is aggregated in the cloud, translating into lower pay-as-you-go prices.
3. **Stop guessing capacity (Ngừng phỏng đoán dung lượng):**
   * **VN:** Tránh việc mua dư thừa máy chủ (gây lãng phí) hoặc mua quá ít (gây sập web). Cloud cho phép mở rộng (Scale up/down) linh hoạt.
   * **EN:** Eliminate guessing on your infrastructure capacity needs. Access as much or as little as you need.
4. **Increase speed and agility (Tăng tốc độ và sự linh hoạt):**
   * **VN:** Khởi tạo tài nguyên CNTT chỉ trong vài phút thay vì vài tuần chờ mua phần cứng.
   * **EN:** IT resources are only a click away, which reduces the time it takes to make those resources available.
5. **Stop spending money running and maintaining data centers (Ngừng tốn tiền vận hành và bảo trì Data Center):**
   * **VN:** Tập trung vào các dự án mang lại giá trị cho doanh nghiệp thay vì phải lo quản lý máy chủ vật lý.
   * **EN:** Focus on projects that differentiate your business, not the infrastructure.
6. **Go global in minutes (Triển khai toàn cầu trong vài phút):**
   * **VN:** Đưa ứng dụng của bạn đến gần khách hàng ở khắp nơi trên thế giới với độ trễ thấp thông qua mạng lưới AWS Regions.
   * **EN:** Easily deploy your application in multiple regions around the world with just a few clicks.

## 2. Billing & Pricing (Thanh toán & Cước phí)

**AWS Pricing Models (Các mô hình tính phí AWS):**
*   **On-Demand (Theo yêu cầu):** 
    *   **VN:** Trả đúng cho thời gian dùng (tính theo giây). Đắt nhất nhưng linh hoạt nhất, không có cam kết.
    *   **EN:** Pay for compute or database capacity by the hour or second with no long-term commitments.
*   **Reserved Instances (Chỗ dành riêng - RI):** 
    *   **VN:** Cam kết sử dụng 1 hoặc 3 năm. Giảm giá lớn (đến 75%) so với On-Demand.
    *   **EN:** Discount (up to 75%) compared to On-Demand pricing by committing to a 1 or 3-year term.
*   **Savings Plans:** 
    *   **VN:** Linh hoạt hơn RI, cam kết một lượng chi tiêu ($/giờ) trong 1 hoặc 3 năm.
    *   **EN:** Flexible pricing model offering lower prices compared to On-Demand pricing in exchange for a specific usage commitment.
*   **Spot Instances:** 
    *   **VN:** Dùng tài nguyên thừa của AWS với giá cực rẻ (giảm đến 90%), nhưng có thể bị lấy lại bất cứ lúc nào (sau 2 phút thông báo).
    *   **EN:** Utilize spare EC2 capacity at steep discounts. Can be interrupted with 2 minutes notice.

---

## Quiz
<!-- quiz: Mô hình thanh toán (Pricing Model) nào phù hợp nhất cho các công việc không quan trọng, có thể bị gián đoạn và cần tiết kiệm chi phí tối đa? -->
<!-- quiz-en: Which pricing model is best for non-critical, interruptible workloads that need the greatest possible cost savings? -->
<!-- option: On-Demand Instances -->
<!-- option: Reserved Instances -->
<!-- option: Spot Instances | correct -->
<!-- option: Dedicated Hosts -->
<!-- explanation: Spot Instances cung cấp mức giảm giá lớn nhất (đến 90%) cho các tài nguyên chưa sử dụng của AWS, cực kỳ phù hợp cho các công việc có thể bị gián đoạn như xử lý batch, render video. -->
<!-- explanation-en: Spot Instances offer the largest discounts, up to 90%, on unused AWS capacity. They are ideal for interruptible workloads such as batch processing and video rendering. -->
