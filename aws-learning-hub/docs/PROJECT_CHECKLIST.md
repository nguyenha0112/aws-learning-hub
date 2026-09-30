# AWS Learning Hub — Master Project Checklist

Tài liệu này dùng để theo dõi tiến độ phát triển hệ thống dựa trên kiến trúc mới (Next.js + NestJS).

## Giai đoạn 1: Khởi tạo & Định hình cấu trúc (ĐÃ HOÀN THÀNH)
- [x] Thiết kế cấu trúc thư mục mới (Frontend, Backend, Content, Docs).
- [x] Khởi tạo dự án Next.js (Frontend) với Tailwind CSS.
- [x] Chuẩn bị thư mục cho NestJS (Backend).
- [x] Hoàn thiện tài liệu Architecture và System Features Specification.
- [x] Cập nhật script `build-content.mjs` hỗ trợ tự động tìm kiếm và xuất JSON cho Next.js.

## Giai đoạn 2: Xây dựng Giao diện người dùng (Next.js Frontend)
- [ ] Thiết lập Global Layout (Header, Footer, Sidebar điều hướng nội dung).
- [ ] Tích hợp Dark/Light Mode.
- [ ] Trang Chủ (Home Page): Hiển thị lộ trình học tập, danh sách khoá học nổi bật.
- [ ] Trang Danh Sách Bài Học (Lesson List): Render danh sách từ dữ liệu `content-index.json`.
- [ ] Trang Chi Tiết Bài Học (Lesson Detail):
  - [ ] Đọc nội dung Markdown và render ra HTML (sử dụng thư viện `react-markdown`).
  - [ ] Hỗ trợ render Video Player.
  - [ ] Hiển thị Quiz trắc nghiệm.
- [ ] Xây dựng tính năng "Hướng Dẫn Tương Tác" (Interactive Onboarding) với `driver.js` và Web Speech API.

## Giai đoạn 3: Phát triển Backend (NestJS API)
- [ ] Khởi tạo dự án NestJS bên trong thư mục `backend/`.
- [ ] Cấu hình kết nối Database (Supabase / PostgreSQL) bằng TypeORM / Prisma.
- [ ] Xây dựng API Đăng nhập/Đăng ký (Authentication) kết hợp JWT hoặc Supabase Auth.
- [ ] Xây dựng API Lưu tiến trình học (Progress Tracking) (hoàn thành bài, điểm số Quiz).
- [ ] API lấy danh sách bài học động (tùy chọn).

## Giai đoạn 4: Tích hợp Toàn Hệ Thống
- [ ] Kết nối Frontend Next.js gọi API từ Backend NestJS (Gửi Token đăng nhập).
- [ ] Tính năng "Đánh dấu hoàn thành" gọi API lên Backend.
- [ ] Hiển thị thông báo (Toast notifications) khi hoàn thành bài / quiz.
- [ ] Cấu hình bảo mật: CORS, Rate Limiting, Role (Admin/User).

## Giai đoạn 5: Mở rộng tính năng (Nâng cao)
- [ ] Tính năng "Ghi chú cá nhân" (Personal Notes).
- [ ] Gamification: Huy hiệu (Badges), Streak.
- [ ] Tìm kiếm bài học (Full-text search).
- [ ] Hoàn thiện dữ liệu bài học AWS thực tế (tất cả các Services).
