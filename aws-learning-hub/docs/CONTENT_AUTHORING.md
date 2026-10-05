# Viết bài học AWS

Mỗi lesson là Markdown có frontmatter theo `content/lesson-template.md`. Sau từng `##` section kiến thức, thêm một knowledge check gồm đúng năm câu để người học tự kiểm tra ngay khi vừa đọc xong.

```md
## Public và private subnet

Nội dung giải thích phần này.

<!-- section-quiz: Public và private subnet -->
<!-- question: Route nào khiến subnet trở thành public? -->
<!-- option: Route tới Internet Gateway | correct -->
<!-- option: Bất kỳ Security Group mở nào -->
<!-- explanation: Public subnet có route tới IGW. -->
<!-- /question -->
<!-- question: ... lặp tới đủ 5 câu. -->
<!-- /section-quiz -->
```

- Tiêu đề `section-quiz` phải trùng chính xác tiêu đề sau `##`.
- Mỗi câu có 2–4 `option`, chỉ một option mang `| correct`.
- Các comment không hiển thị trong Markdown; website tự render thành interactive check ngay sau section.
- Giữ `## Quiz` cuối bài cho một scenario tổng kết, nếu phù hợp.
- Chạy `node scripts/build-content.mjs` mỗi khi thay đổi nội dung.
