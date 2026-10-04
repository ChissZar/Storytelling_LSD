# Đổi mới — Từ quyết sách đến cuộc sống

Website scrollytelling môn Lịch sử Đảng, nhìn lại 1986–2026. Thời lượng đọc dự kiến 8–10 phút (tùy thời gian tương tác). Trường Đại Học Công Nghệ Kỹ Thuật. Giảng viên: ThS. Lê Quang Chung.

## Xem website

Mở `index.html` bằng trình duyệt. Website dùng HTML/CSS/JavaScript thuần, ảnh và dữ liệu lưu ngay trong dự án; không cần cài thư viện, không cần API key và không cần bước build.

Nếu muốn chạy máy chủ cục bộ, dùng Node.js:

```powershell
node server.cjs
```

Mở http://localhost:4173. Dừng bằng Ctrl+C.

## Đưa lên Netlify

1. Giải nén `doi-moi-website.zip` vào một thư mục riêng.
2. Mở https://app.netlify.com/drop và đăng nhập tài khoản của bạn nếu được yêu cầu.
3. Kéo thư mục vừa giải nén, có `index.html` ở ngay cấp đầu tiên, vào vùng triển khai.
4. Dùng URL Netlify cung cấp. Kiểm tra URL trên điện thoại hoặc cửa sổ riêng tư trước khi nộp.

Nếu kết nối Git với Netlify: để trống Build command, Publish directory là `.`. Có sẵn `netlify.toml`.

Tham khảo chính thức: [Netlify — Create deploys](https://docs.netlify.com/deploy/create-deploys/). Bản giao này chưa được xuất bản lên tài khoản hosting; chưa có URL công khai.

## Đưa lên GitHub Pages

1. Tạo repository và tải các tệp trong ZIP lên thư mục gốc.
2. Vào Settings → Pages → Build and deployment.
3. Chọn Deploy from a branch, chọn nhánh chứa website (thường là `main`), thư mục `/(root)`, rồi Save.
4. Chờ GitHub hoàn tất và mở URL được hiển thị. Các đường dẫn tài nguyên đều tương đối nên dùng được dưới đường dẫn repository.

Tham khảo: [GitHub — Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Cấu trúc

- `index.html`: nội dung, dẫn nguồn và thông tin nhóm.
- `styles.css`: giao diện máy tính/điện thoại, chế độ giảm chuyển động và in.
- `app.js`: cuộn trang, biểu đồ, so sánh ảnh và chấm câu hỏi.
- `data.js`: dữ liệu đã đối chiếu dùng cho biểu đồ.
- `data/`: CSV tải xuống và ghi chú nguồn.
- `assets/`: ảnh gốc, ảnh phục chế, favicon và nhật ký phục chế.
- `THUYET_TRINH.md`: gợi ý phân chia bài thuyết trình 8–10 phút.
- `checks/`: mã kiểm tra, ảnh chụp màn hình và kết quả kiểm chứng. Không cần tải thư mục này lên hosting.

## Sửa nội dung

Sửa văn bản trong `index.html`. Nếu thay đổi số liệu GDP, cập nhật đồng thời `data.js`, CSV, nhận định trong bài và nguồn. Với dữ liệu giảm nghèo, cập nhật cả phần biểu đồ HTML, CSV và phép tính. Không nối các chuẩn nghèo khác nhau thành một chuỗi so sánh.

## Kiểm tra

```powershell
node checks/verify.cjs
```

Kiểm tra trình duyệt dùng Edge trên Windows, không cần thư viện ngoài:

```powershell
node checks/browser.cjs
```

Lần kiểm tra 04/10/2026: dữ liệu, tài nguyên, liên kết nội bộ, tương tác, bố cục 1440/390/320 px và giảm chuyển động đạt. Xem `checks/QA.md`. Chưa kiểm tra trên thiết bị iOS/Safari thật hoặc URL hosting công khai.

## Thành viên

| Họ và tên | Mã số sinh viên |
| --- | --- |
| Nguyễn Phước Minh Triết | 24110357 |
| Nguyễn Phước Thọ | 24110343 |
| Trần Tiến Đạt | 24110198 |
| Lương Xuân Phúc | 24142302 |
| Đinh Thiên Bảo | 24162009 |
