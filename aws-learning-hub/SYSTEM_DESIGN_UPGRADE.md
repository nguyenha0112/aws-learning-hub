# Thiết Kế Nâng Cấp Hệ Thống (AWS Learning Hub)

## 1. Kiến Trúc Mới

Thay vì sử dụng HTML tĩnh và một số file JS đơn giản, chúng ta sẽ chuyển sang mô hình Client-Server hiện đại:

- **Frontend (Client)**: **Next.js** (App Router, Tailwind CSS, TypeScript).
  - Tối ưu SEO và tốc độ tải trang nhờ SSR (Server-Side Rendering) / SSG (Static Site Generation).
  - Component hóa các thành phần (Header, Sidebar, Bài học, Flashcard).
  - Trải nghiệm người dùng mượt mà, định tuyến (routing) động cho các bài học.

- **Backend (Server)**: **NestJS** (TypeScript).
  - Kiến trúc module chặt chẽ (Controller, Service, Module).
  - Cung cấp RESTful API cho Next.js để lấy dữ liệu bài học, user, progress.
  - Tích hợp với Database (có thể dùng Supabase, PostgreSQL) thông qua TypeORM hoặc Prisma trong tương lai.

## 2. Lợi Ích Của Việc Nâng Cấp

1. **Khả Năng Mở Rộng (Scalability)**: Codebase được chia nhỏ thành nhiều module/component, dễ dàng thêm tính năng mới như Quiz, Bài thi trắc nghiệm, Theo dõi tiến độ học tập.
2. **Dễ Dàng Bảo Trì (Maintainability)**: Sử dụng TypeScript giúp phát hiện lỗi sớm. NestJS có kiến trúc Dependency Injection chuẩn doanh nghiệp.
3. **Bảo Mật**: Các logic về Database, User Auth sẽ nằm gọn ở Backend, Frontend chỉ giao tiếp qua API.
4. **Giao Diện Chuyên Nghiệp**: Next.js kết hợp Tailwind CSS sẽ giúp thiết kế UI/UX ấn tượng và có tính tương tác cao hơn so với HTML/CSS thuần túy.

## 3. Lộ Trình Triển Khai

1. **Khởi tạo Project**:
   - Tạo thư mục `frontend/` cho Next.js.
   - Tạo thư mục `backend/` cho NestJS.
2. **Di chuyển Dữ Liệu Cũ**:
   - Chuyển đổi các nội dung tĩnh từ thư mục `web/` sang mô hình component của React/Next.js.
   - Xây dựng API trong NestJS để phục vụ danh sách bài học và tài liệu `.md`.
3. **Tích Hợp API**:
   - Frontend fetch dữ liệu từ Backend.
   - Xử lý xác thực người dùng (Auth) nếu cần thiết.
4. **Xây Dựng UI Mới**:
   - Thiết kế giao diện hiện đại, có Dark Mode, layout linh hoạt (Responsive).
