//get dữ liệu về từ LocalStorage
const types = JSON.parse(localStorage.getItem("types")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];
const prices = JSON.parse(localStorage.getItem("prices")) || [];

//Lấy các sản phẩm không bị ẩn
const visibleTypes = types.filter((t) => !t.status).map((t) => t.name);
const visibleProducts = products.filter((p) => visibleTypes.includes(p.type));

//merge giá với sản phẩm
let allProducts = visibleProducts.map((p) => {
  // tìm giá tương ứng
  const priceInfo = prices.find((price) => p.name === price.name) || {
    sale: 0,
  };

  return {
    name: p.name,
    price: priceInfo.sale,
    img: p.img || priceInfo.img || "../img/default.jpg",
    category: p.type, // Lấy type từ product luôn
  };
});

let show = allProducts.slice();
let page = 1;
let itemsPerPage = 8;
//========================RENDER RA SẢN PHẨM Ở TRANG SẢN PHẨM=========
//tạo ra thẻ sản phẩm
function createProductCard(banh) {
  const card = document.createElement("div");
  card.className = "product-card";
  // Gắn dataset
  card.dataset.name = banh.name;
  card.dataset.category = banh.category;
  card.dataset.price = banh.price;
  card.dataset.img = banh.img || "../img/default.jpg";
  // Nội dung HTML
  card.innerHTML = `
    <img src="${banh.img || "../img/default.jpg"}" alt="${
    banh.name
  }" class="product-image" />
    <div class="product-info">
      <span class="category">${banh.category}</span>
      <h3>${banh.name}</h3>
      <p class="price">${Number(banh.price).toLocaleString("vi-VN")}₫</p>
      <button class="add-to-cart">
        <i class='bx bx-cart-add'></i> Thêm vào giỏ hàng
      </button>
    </div>
  `;
  return card;
}
//render sản phẩm ra trang
function renderGrid() {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = show.slice(start, end);

  items.forEach((cake) => {
    const card = createProductCard(cake);
    grid.appendChild(card);
  });
}

// Bắt sự kiện click trên grid (event delegation)
const grid = document.querySelector("#productGrid");
grid.addEventListener("click", function (e) {
  const card = e.target.closest(".product-card");
  if (!card) return;
  if (e.target.closest(".add-to-cart")) {
    // Click vào nút thêm giỏ hàng
    themVaoGioHang(card.dataset.name, card.dataset.price, card.dataset.img);
  } else {
    // Click vào phần khác của card => hiện popup
    showProductDetail(card.dataset);
  }
});

//======================Tạo nút phân trang==============================
const pagination = document.querySelector("#pagination");
function renderPagination() {
  if (!pagination) return;
  pagination.innerHTML = "";
  if (show.length === 0) return; // nếu mà ko có sản phẩm nào thì ko có tạo
  const totalPages = Math.max(1, Math.ceil(show.length / itemsPerPage));
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === page) btn.classList.add("active");
    pagination.appendChild(btn);
  }
}

//hàm tái tạo lại sản phẩm show và số trang đang đc show
function refresh() {
  renderGrid();
  renderPagination();
}

//bắt sự kiện click trên pagination (event delegation)
pagination.addEventListener("click", function (e) {
  const clicked = e.target.closest("button");
  if (!clicked || !pagination.contains(clicked)) return;
  const pageNumber = Number(clicked.textContent);
  page = pageNumber;
  refresh();
});

//==============SHOW POPUP DETAIL SẢN PHẨM============
function showProductDetail(data) {
  const modal = document.querySelector("#productModal");
  const modalBody = document.querySelector("#modalBody");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="product-detail">
      <img src="${data.img}" alt="${data.name}" class="detail-image" />
      <h2>${data.name}</h2>
      <p class="detail-category"><strong>Loại:</strong> ${data.category}</p>
      <p class="detail-price">${Number(data.price).toLocaleString("vi-VN")}₫</p>
      <button class="add-to-cart-modal">
        <i class='bx bx-cart-add'></i> Thêm vào giỏ hàng
      </button>
    </div>
  `;

  //bắt sự kiện click cho nút mua hàng trong modal chi tiết
  const buyBtn = modalBody.querySelector(".add-to-cart-modal");
  if (!buyBtn) return;
  buyBtn.addEventListener("click", () => {
    themVaoGioHang(data.name, data.price, data.img);
    closeProductModal();
  });
  modal.classList.add("active");
}
//đóng popup
function closeProductModal() {
  const modal = document.querySelector("#productModal");
  if (modal) modal.classList.remove("active");
}

//=============LỌC THEO CATEGORY=====================
function setActiveCategoryTab(categoryName) {
  const tabs = document.querySelectorAll(".category-tab");
  tabs.forEach((t) => {
    t.classList.toggle(
      "active",
      t.textContent.trim() === (categoryName || "Tất cả")
    );
  });
}
function filterByCategory(categoryName) {
  if (categoryName) {
    show = allProducts.filter((p) => p.category === categoryName);
  } else {
    show = allProducts.slice();
  }
  page = 1;
  setActiveCategoryTab(categoryName);
  refresh();
}
document.querySelector("#categoryTabs").addEventListener("click", function (e) {
  const tab = e.target.closest(".category-tab");
  if (!tab) return;
  const txt = tab.textContent.trim();
  const category = txt === "Tất cả" ? "" : txt;
  filterByCategory(category);
});

//============HÀM SEARCH ĐƠN GIẢN==============
function searchProducts() {
  const boxSearch = document.querySelector("#productSearch");
  const keyword = (boxSearch?.value || "").toLowerCase();
  show = allProducts.filter((p) => {
    return p.name.toLowerCase().includes(keyword);
  });
  page = 1;
  refresh();
}
//Khởi tạo khi DOM sẵn sàng
window.addEventListener("DOMContentLoaded", () => {
  // Nếu có ô tìm kiếm, gắn sự kiện
  const productSearch = document.getElementById("productSearch");
  if (productSearch) productSearch.addEventListener("keyup", searchProducts);
  // Hiển thị tất cả mặc định
  refresh();
});
//=============ADVANCED SEARCH================
//toggle bật tắt
function toggleAdvancedSearch() {
  const advancedSearch = document.querySelector(".advanced-search");
  advancedSearch.classList.toggle("active");
}
const toggleAdvanced = document.querySelector(".toggle-advanced");
toggleAdvanced.addEventListener("click", toggleAdvancedSearch);

//áp dụng search nâng cao
function applyAdvancedFilter() {
  let category = document.querySelector("#categoryFilter").value;
  if (category) {
    setActiveCategoryTab(category); // để active tab
  } else {
    setActiveCategoryTab(""); // active tab "Tất cả"
  }
  let minVal = document.getElementById("minPrice").value;
  let maxVal = document.getElementById("maxPrice").value;
  // Nếu rỗng thì để null (bỏ qua), nếu có thì chuyển thành Number
  let minPrice = minVal === "" ? null : Number(minVal);
  let maxPrice = maxVal === "" ? null : Number(maxVal);
  show = allProducts.filter((p) => {
    let price = Number(p.price);
    if (Number.isNaN(price)) return false;
    if (category && p.category !== category) return false;
    if (minPrice !== null && price < minPrice) return false;
    if (maxPrice != null && price > maxPrice) return false;
    return true;
  });
  page = 1;
  refresh();
}
//==============TƯƠNG TÁC DANH MỤC SẢN PHẨM=====================
function attachCategoryClickEvents() {
  document.querySelectorAll(".product-item[data-category]").forEach((i) => {
    i.addEventListener("click", (e) => {
      const cat = i.dataset.category;
      LoadPage(pageproducts);
      setTimeout(() => {
        filterByCategory(cat);
      }, 100);
    });
  });
}
//============RENDER MENU Ở TRANG CHỦ====================
function renderMenuRight(products) {
  const menuRight = document.querySelector(".menu-right");
  if (!menuRight) return;
  menuRight.innerHTML = "";
  products.forEach((cake) => {
    const card = createProductCard(cake);
    menuRight.appendChild(card);
  });
}
//bắt sự kiện từng card trên menuRight
const menuRight = document.querySelector(".menu-right");
menuRight.addEventListener("click", function (e) {
  const card = e.target.closest(".product-card");
  if (!card) return;
  if (e.target.closest(".add-to-cart")) {
    // Click vào nút thêm giỏ hàng
    themVaoGioHang(card.dataset.name, card.dataset.price, card.dataset.img);
  } else {
    // Click vào phần khác của card => hiện popup
    showProductDetail(card.dataset);
  }
});
//khi click vào best seller  sẽ render ra 6 sp đầu
document.getElementById("bestban").addEventListener("click", function () {
  renderMenuRight(allProducts.slice(0, 6)); // 6 sản phẩm đầu
});
//khi click vào sp mới sẽ cho ra 6 sp cuối
document.getElementById("newproduct").addEventListener("click", function () {
  renderMenuRight(allProducts.slice(-6)); // 6 sản phẩm cuối
});

//=================RENDER CATEGORY CHO CATEGORYTABS & ADVANCED FILTER=========
function renderCategoryTabs() {
  const categoryTabs = document.getElementById("categoryTabs");
  const categoryFilter = document.getElementById("categoryFilter");
  // Xóa nội dung cũ
  categoryTabs.innerHTML = "";
  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="">Tất cả</option>';
  }
  // Tạo nút tất cả trước tiên
  const btnAll = document.createElement("button");
  btnAll.className = "category-tab active";
  btnAll.textContent = "Tất cả";
  btnAll.onclick = function () {
    filterByCategory("");
  };
  categoryTabs.appendChild(btnAll);
  //Render các category còn lại
  types.forEach((type) => {
    const btn = document.createElement("button");
    btn.className = "category-tab";
    btn.textContent = type.name;
    btn.onclick = function () {
      filterByCategory(type.name);
    };
    categoryTabs.appendChild(btn);

    //Render vào dropdown filter của advanced search
    if (categoryFilter) {
      const option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.name;
      categoryFilter.appendChild(option);
    }
  });
}

//HÀM KHỞI TẠO KHI LOAD TRANG
window.addEventListener("DOMContentLoaded", () => {
  renderCategoryTabs(); // Render category tabs
  renderMenuRight(allProducts.slice(0, 6)); // Hiện 6 sản phẩm đầu ở menu-right
  attachCategoryClickEvents(); // Gắn sự kiện click cho danh mục sản phẩm
});
