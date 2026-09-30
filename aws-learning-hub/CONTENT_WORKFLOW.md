# Content workflow — thêm bài học không sửa giao diện

## Nguồn dữ liệu duy nhất

Mỗi bài là một file Markdown trong `content/lessons/`. Frontmatter mô tả metadata, phần thân là nội dung bài học.

```md
---
id: aws-service-slug
title: Tên bài học
domain: Compute | Storage | Security | Networking | Database
duration_minutes: 45
level: Foundation | Associate
video_url: https://www.youtube.com/embed/VIDEO_ID
published: true
---

# Mở đầu
Nội dung Markdown...

## Quiz
<!-- quiz: Câu hỏi? -->
<!-- option: Lựa chọn A -->
<!-- option: Lựa chọn B | correct -->
<!-- explanation: Vì sao đáp án đúng. -->
```

## Quy trình tự động

1. Sao chép `content/lesson-template.md`, viết nội dung và quiz.
2. Chạy `node scripts/build-content.mjs`.
3. Script tạo `web/content-index.json` cho website.
4. Sau khi database đã có schema, chạy `node scripts/sync-supabase.mjs` để đồng bộ content metadata vào Supabase.
5. Mở website, kiểm tra preview, quiz và video; commit/push.

## Quy tắc nội dung

- Viết Markdown trước; website chỉ là lớp hiển thị.
- Mỗi bài tối thiểu: mục tiêu, giải thích, scenario, lab, lỗi hay gặp, quiz.
- Video phải là URL `https://www.youtube.com/embed/...` hoặc một video URL cho phép embed.
- Không để secret, API key hay dữ liệu account thật trong Markdown.
