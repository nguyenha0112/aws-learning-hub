# Tài Liệu Đặc Tả Chức Năng Hệ Thống (System Features Specification)

Tài liệu này đóng vai trò là "Bản vẽ tính năng" để định hướng phát triển phần mềm cho các Agent hoặc Lập trình viên trong tương lai.

---

## 1. Các Tính Năng Cốt Lõi (Standard Core Features)
Đây là các tính năng tiêu chuẩn mà một hệ thống LMS (Learning Management System) hiện tại phải có:

*   **Quản Lý Lộ Trình Học Tập (Learning Paths):** Cấu trúc bài học theo chứng chỉ (vd: Cloud Practitioner, Solutions Architect).
*   **Hiển Thị Bài Học (Content Viewer):** Render bài học từ Markdown, hỗ trợ embed Video (YouTube/Vimeo), Text, và Code snippet.
*   **Hệ Thống Trắc Nghiệm (Quizzes & Flashcards):** Đánh giá kiến thức ngay sau mỗi bài học với giải thích chi tiết.
*   **Xác Thực Người Dùng (Authentication):** Đăng ký/Đăng nhập (sử dụng JWT hoặc Supabase Auth).

## 2. Các Tính Năng Đề Xuất Bổ Sung (Recommended & Advanced Features)
Để hệ thống hoàn thiện và giữ chân người dùng (Retention), cần phát triển thêm:

*   **Progress Tracking (Theo Dõi Tiến Độ):**
    *   Lưu lại % hoàn thành của từng module.
    *   Nút "Mark as Complete" ở mỗi bài.
*   **Personal Notes (Ghi Chú Cá Nhân):** Cho phép người dùng bôi đen text trong bài và tạo ghi chú, hoặc gõ ghi chú nháp theo timestamp của video.
*   **Gamification (Game hóa):** Tích lũy điểm kinh nghiệm (XP) sau mỗi quiz đúng, hiển thị Chuỗi ngày học (Streak), và Huy hiệu (Badges).
*   **Q&A / Comments:** Phần thảo luận dưới mỗi bài học để hỏi đáp (kết nối với Backend NestJS).

---

## 3. Chức Năng Đặc Biệt: Hệ Thống Hướng Dẫn Tương Tác (Interactive Onboarding Tour)
*Đây là tính năng trải nghiệm người dùng (UX) nâng cao giúp hướng dẫn người dùng mới.*

### Mô tả yêu cầu (Requirements)
*   **Vị trí:** Nút "Hướng dẫn" (Trợ giúp) luôn nổi ở góc dưới cùng bên phải màn hình (Bottom-Right FAB).
*   **Ngữ cảnh (Contextual):** Tùy vào việc người dùng đang ở trang nào (Trang chủ, Trang bài học, Trang làm Quiz), hệ thống sẽ load một "Kịch bản hướng dẫn" (Tour script) riêng.
*   **Hiệu ứng UI:**
    *   Làm mờ (Dim/Overlay) toàn bộ nền của trang web.
    *   Làm nổi bật (Highlight) phần tử (element) cần tương tác.
    *   Hiển thị hộp thoại (Dialog/Tooltip) kế bên phần tử được highlight, giải thích người dùng cần làm gì.
*   **Tích hợp Giọng nói (Voice/Audio):** Khi hộp thoại xuất hiện, hệ thống sẽ tự động phát âm thanh (đọc câu hướng dẫn).
*   **Luồng hoạt động:** Người dùng ấn "Tiếp tục" (hoặc click vào phần tử được highlight), hiệu ứng sẽ dịch chuyển mượt mà sang phần tử tiếp theo của kịch bản.

### Hướng Dẫn Triển Khai Cho Lập Trình Viên / Agent (Implementation Guide)

Khi một Agent/Dev nhận yêu cầu code tính năng này, hãy tuân theo các bước sau:

1.  **Thư Viện Đề Xuất (Frontend - Next.js):**
    *   Nên sử dụng thư viện **[driver.js](https://driverjs.com/)** hoặc **react-joyride**. `driver.js` rất nhẹ, hỗ trợ animate chuyển bước mượt mà và làm mờ background hoàn hảo.
2.  **Quản Lý State & Cấu Hình:**
    *   Tạo file `src/config/tours.ts` chứa cấu hình theo route. 
    *   Ví dụ:
        ```javascript
        export const lessonTour = [
          { element: '#video-player', popover: { title: 'Xem bài giảng', description: 'Hãy bắt đầu bằng việc xem video này nhé.' } },
          { element: '#quiz-section', popover: { title: 'Làm trắc nghiệm', description: 'Sau khi xem xong, hãy trả lời câu hỏi ở đây.' } }
        ]
        ```
3.  **Tích Hợp Voice (Web Speech API):**
    *   Không cần cài thêm thư viện nặng, hãy sử dụng Native Web API: `window.speechSynthesis`.
    *   Lắng nghe sự kiện (event) khi chuyển bước của `driver.js` (vd: `onHighlightStarted`). Hàm callback sẽ gọi `speechSynthesis.speak(new SpeechSynthesisUtterance(step.description))`.
    *   *Lưu ý:* Cần có nút "Tắt/Bật âm thanh" ở UI Tooltip vì trình duyệt có thể block autoplay audio nếu người dùng chưa tương tác với trang.
4.  **Kiến Trúc Component:** 
    *   Tạo một `<OnboardingProvider />` bọc toàn app hoặc đặt cục bộ ở `layout.tsx` của Next.js để có thể kích hoạt bằng nút ở góc phải dưới bất kỳ lúc nào.
