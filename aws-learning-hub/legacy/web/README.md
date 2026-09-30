# AWS Learning Hub Web

Trang học tĩnh, có thể mở ngay bằng `web/index.html` hoặc deploy qua GitHub Pages.

## Supabase

1. Mở Supabase Dashboard → **SQL Editor**.
2. Chạy toàn bộ file [`../supabase/schema.sql`](../supabase/schema.sql).
3. Vào Authentication → URL Configuration, thêm URL local/GitHub Pages của website vào **Redirect URLs** để magic link quay về đúng trang.
4. Publishable key trong `config.js` là an toàn ở browser. Không đưa `SUPABASE_SECRET_KEY` vào frontend, file Git hay GitHub.

Khi chưa có Supabase schema hoặc người học chưa đăng nhập, website vẫn lưu tiến độ học trong `localStorage`.

## Deploy GitHub Pages

Trong GitHub repository: Settings → Pages → Deploy from a branch → `main` → folder `/aws-learning-hub/web`.
