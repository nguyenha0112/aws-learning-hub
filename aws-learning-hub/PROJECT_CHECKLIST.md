# AWS Learning Platform — checklist triển khai

## Giai đoạn 1 — Nền tảng nội dung

- [x] Chuẩn Markdown + frontmatter cho bài học.
- [x] Generator chuyển Markdown thành `web/content-index.json`.
- [x] Website đọc content index và render Markdown thành bài học.
- [x] Metadata cho thời lượng, domain, level, video và quiz.
- [x] Template bài học để thêm service mới nhất quán.

## Giai đoạn 2 — Dữ liệu & tài khoản

- [x] Thiết kế schema Supabase cho lessons, quiz JSON và progress.
- [x] RLS: mọi người chỉ xem published lesson, user chỉ thao tác progress của mình.
- [x] Magic-link authentication trong website.
- [ ] Thêm `SUPABASE_ACCESS_TOKEN` (scoped PAT: Database Read-write) vào `.env`.
- [ ] Chạy `node scripts/apply-schema.mjs` để tự tạo database schema.
- [ ] Chạy `node scripts/sync-supabase.mjs` để seed 4 bài đầu tiên.
- [ ] Thêm GitHub Pages URL vào Supabase Auth Redirect URLs.

## Giai đoạn 3 — Trải nghiệm học

- [x] Dashboard, library, lesson reader, quiz, flashcard, dark mode, progress.
- [x] Khu vực video tự xuất hiện khi lesson có `video_url`.
- [ ] Thêm video đã chọn/làm riêng cho từng bài.
- [ ] Lịch spaced repetition và thống kê theo domain.
- [ ] Tìm kiếm toàn văn và filter theo certificate/domain.

## Giai đoạn 4 — Mở rộng nội dung

- [x] Bộ dữ liệu khởi tạo: IAM, VPC, EC2, S3.
- [ ] Nâng Lambda, RDS, DynamoDB, CloudFront, Route 53 theo template mới.
- [ ] Thêm hands-on lab có checklist cleanup chi phí.
- [ ] Thêm mock exam theo Cloud Practitioner và SAA-C03.
