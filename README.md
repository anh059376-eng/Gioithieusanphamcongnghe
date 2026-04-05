**TechStore — Website giới thiệu sản phẩm Công Nghệ**
Một trang web tĩnh (HTML/CSS/JS) để trình diễn trang web gioiws thiệu thiết bị công nghệ với giao diện người dùng và trang quản trị đơn giản.
**Tên thành viên:**
- **Lê Văn Thành Anh:** thực hiện phần admin,Mac,iPad.
- **Phạm Nguyễn Phương Anh:** thực hiện phần iPhone.
- **Nguyễn Thị Vân Anh:** thực hiện phần giỏ hàng và đăng ký.
- **Hồ Thanh Tú:** thực hiện phần Airpods, sản phẩm.
**Mô tả ngắn:**

- **Project:** Trang giới thiệu thiết bị công nghệ đơn giản, lưu dữ liệu cục bộ bằng `LocalStorage`.
- **Đã deploy:** site production hiện tại: `https://dreamycakee.netlify.app` (đã deploy bằng Netlify).

**Tính năng chính:**

- **Người dùng:** trang chủ, iPhone, iPad, Mac, Airpods, liên hệ, danh mục sản phẩm, giỏ hàng, responsive.
- **Admin:** trang đăng nhập, quản lý sản phẩm (thêm/sửa/xóa), quản lý danh mục.

**Công nghệ:**

- HTML5, CSS3, Vanilla JavaScript
- LocalStorage (lưu sản phẩm, giỏ hàng)

**Cách chạy (local)**

- Mở file `user/index.html` và `admin/admin-login.html` trực tiếp trong trình duyệt (dự án là static).
- Nếu muốn phục vụ bằng một HTTP server (để tránh vấn đề CORS khi dùng fetch), dùng một trong các lệnh sau trong thư mục gốc của dự án:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server, nếu đã cài)
npx http-server -p 8000
```

Sau đó mở `http://localhost:8000/user/index.html` hoặc `http://localhost:8000/admin/admin-login.html`.

**Deploy lên Netlify (đã thực hiện)**

- Site đã được link và deploy lên Netlify
  -> admin url: https://dreamycakee.netlify.app/admin/admin-login.html
  -> user url: https://dreamycakee.netlify.app/user/index.html

```bash
# đăng nhập (mở trình duyệt)
npx netlify-cli login

# link tới site đã tồn tại (chỉ cần khi chưa link)
npx netlify-cli link

# deploy production
npx netlify-cli deploy --prod --dir=.
```

**Cấu trúc thư mục (tóm tắt)**

- `admin/` — trang, CSS và JS quản trị
- `user/` — trang người dùng, CSS và JS
- `css/` — các stylesheet dùng chung
- `img/` — assets hình ảnh
- `netlify.toml` — cấu hình Netlify (nếu có)

**Góp ý / Phát triển tiếp**

- Nếu muốn lưu dữ liệu trên server thay vì `LocalStorage`, cần API backend (ví dụ Node.js + Express).
- Có thể thêm build step bằng bundler (Vite/Webpack) nếu dự án mở rộng.

**Cách đóng góp**

- Fork repo → tạo branch → PR với mô tả thay đổi rõ ràng.

**Bản quyền**

- © 2026 ATechZ. Mọi quyền được bảo lưu.

---

