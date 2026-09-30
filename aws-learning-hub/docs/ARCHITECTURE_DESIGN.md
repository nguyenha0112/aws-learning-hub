# Thiết Kế Kiến Trúc: AWS Learning Hub (Complete System)

Dưới đây là sơ đồ kiến trúc tổng thể cho hệ thống học tập hoàn chỉnh, bao gồm Frontend (Next.js), Backend (NestJS), và Database (PostgreSQL/Supabase).

## 1. Sơ Đồ Kiến Trúc Hệ Thống (Architecture Diagram)

```mermaid
graph TD
    %% Users
    User((Người Dùng\n(Học viên)))

    %% Frontend
    subgraph Frontend [Frontend: Next.js App Router]
        UI[Giao diện người dùng\n(React + TailwindCSS)]
        AuthUI[Trang Đăng Nhập/Đăng Ký]
        LessonUI[Trang Bài Học & Video]
        QuizUI[Hệ thống Trắc Nghiệm]
        DashboardUI[Dashboard Tiến Độ]
    end

    %% Backend
    subgraph Backend [Backend: NestJS REST API]
        AuthService[Auth Service\n(JWT / Supabase Auth)]
        ContentService[Content Service\n(Quản lý bài học)]
        ProgressService[Progress Service\n(Lưu tiến độ & điểm thi)]
        
        API[API Gateway / Controllers]
        API --> AuthService
        API --> ContentService
        API --> ProgressService
    end

    %% Database & External
    subgraph Storage [Database & Caching]
        DB[(Supabase / PostgreSQL\nLưu User, Tiến độ, Quiz)]
        Redis[(Redis - Optional\nCache nội dung bài học)]
    end

    %% CMS / Content Pipeline
    subgraph CMS [Content Pipeline]
        MD[Markdown Files\n(Thư mục content/)]
        Scripts[Build Scripts\n(build-content.mjs)]
        Scripts -.->|Sync Metadata| DB
        Scripts -.->|Generate JSON| Frontend
    end

    %% Flow
    User -->|Tương tác web| UI
    UI --> AuthUI
    UI --> LessonUI
    UI --> QuizUI
    UI --> DashboardUI

    AuthUI <-->|REST API| API
    LessonUI <-->|REST API / SSG| API
    QuizUI <-->|REST API| API
    DashboardUI <-->|REST API| API

    AuthService <-->|Query| DB
    ContentService <-->|Query| DB
    ProgressService <-->|Query| DB
    
    MD --> Scripts
```

## 2. Giải Thích Các Thành Phần (Components)

### A. Frontend (Next.js)
- **Công nghệ**: Next.js (App Router), React, Tailwind CSS, TypeScript.
- **Nhiệm vụ**: 
  - Render giao diện tĩnh (SSG) cho các bài học Markdown để tối ưu SEO và tốc độ.
  - Sử dụng Client Components (CSR) cho các tính năng tương tác như làm Quiz, xem tiến độ học tập, lưu ghi chú.
  - Quản lý State toàn cục bằng React Context hoặc Zustand.

### B. Backend (NestJS)
- **Công nghệ**: NestJS, TypeScript, TypeORM/Prisma.
- **Nhiệm vụ**:
  - **Auth**: Xác thực người dùng (có thể tích hợp trực tiếp Supabase Auth).
  - **Progress Tracking**: Lưu lại trạng thái bài học (Đã hoàn thành, điểm Quiz).
  - **Content API**: Cung cấp API để fetch danh sách bài học động hoặc tìm kiếm bài học nếu dữ liệu quá lớn.

### C. Cơ Sở Dữ Liệu (Supabase / PostgreSQL)
- Lưu trữ người dùng (`users`), bài học metadata (`lessons`), lịch sử làm bài (`quiz_results`), và tiến độ (`progress`).

### D. Content Pipeline (Markdown to App)
- Giữ nguyên triết lý "Content-first": Người tạo nội dung chỉ cần viết Markdown trong thư mục `content/`. 
- Khi chạy script `build-content.mjs`, nó sẽ biên dịch Markdown thành dữ liệu JSON cho Next.js render (Static) và đồng thời push metadata lên Database để theo dõi tiến độ (Dynamic).

## 3. Lộ Trình Phát Triển Tiếp Theo

1. **Giai đoạn 1 (Hiện tại)**: Xây dựng UI Next.js đọc dữ liệu tĩnh từ JSON (chưa cần backend động). Hoàn thiện trang danh sách bài học và trang chi tiết bài học.
2. **Giai đoạn 2 (Backend Core)**: Dựng NestJS Backend, kết nối Database, làm API Auth và User Progress.
3. **Giai đoạn 3 (Tích hợp)**: Gọi API từ Next.js, cập nhật UI khi user làm xong Quiz hoặc đánh dấu hoàn thành bài học.
