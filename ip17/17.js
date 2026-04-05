document.addEventListener("DOMContentLoaded", () => {

    // ================= 1. Xử lý Thanh trượt (Carousel Highlights) =================
    const carouselContainer = document.getElementById('highlight-carousel');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    const slides = document.querySelectorAll('.carousel-slide');

    // Cập nhật dấu chấm (dot) khi cuộn ngang
    carouselContainer.addEventListener('scroll', () => {
        let scrollPosition = carouselContainer.scrollLeft;
        let slideWidth = slides[0].offsetWidth;

        // Tính toán slide nào đang ở giữa màn hình
        let currentIndex = Math.round(scrollPosition / slideWidth);

        // Cập nhật class active cho dot
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    });

    // Khi click vào dấu chấm -> cuộn tới slide tương ứng
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const slideWidth = slides[0].offsetWidth;
            // Cuộn mượt (smooth) tới vị trí
            carouselContainer.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
        });
    });

    // ================= 2. Xử lý Menu Thay đổi ảnh (Take a closer look) =================
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    const featureImage = document.getElementById('feature-image');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            if (!featureImage) return; // Đảm bảo thẻ ảnh tồn tại

            // Xóa class active ở tất cả các nút
            accordionBtns.forEach(b => b.classList.remove('active'));
            // Thêm class active cho nút được click
            const currentBtn = e.currentTarget;
            currentBtn.classList.add('active');

            // Lấy URL ảnh từ data-attribute và mờ ảnh cũ đi
            const newImageSrc = currentBtn.getAttribute('data-image');
            
            if (newImageSrc) {
                featureImage.style.opacity = '0'; // Hiệu ứng mờ

                setTimeout(() => {
                    featureImage.src = newImageSrc;
                    featureImage.style.opacity = '1'; // Rõ lại sau khi đổi nguồn
                }, 300); // Đợi 300ms khớp với thời gian transition 0.3s trong CSS
            }
        });
    });

    // ================= 3. Xử lý Nút chọn tiêu cự (Focal Length) =================
    const focalBtns = document.querySelectorAll('.focal-btn');
    const focalImage = document.getElementById('focal-image');

    focalBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Nếu không tìm thấy ảnh thì không làm gì
            if (!focalImage) return;

            // Xóa active ở tất cả nút
            focalBtns.forEach(b => b.classList.remove('active'));
            // Thêm active cho nút hiện tại
            this.classList.add('active');

            // Lấy URL ảnh từ data-attribute
            const newImageSrc = this.getAttribute('data-image');

            // Thêm hiệu ứng mờ dần
            focalImage.style.opacity = 0;

            // Đổi ảnh sau một khoảng trễ ngắn để hiệu ứng mượt hơn
            setTimeout(() => {
                focalImage.src = newImageSrc;
                focalImage.style.opacity = 1;
            }, 200); // 200ms khớp với thời gian transition trong CSS
        });
    });

});