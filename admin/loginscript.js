window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("rememberedUser1");
  const savedPass = localStorage.getItem("rememberedPass1");

  if (savedUser && savedPass) {
    document.getElementById("username").value = savedUser;
    document.getElementById("password").value = savedPass;
    document.getElementById("rememberAdmin").checked = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".login").style.display = "block";

  if (!localStorage.getItem("adminAccounts")) {
    const defaultAdmins = [
      { username: "admin1", password: "123456" },
      { username: "admin2", password: "654321" },
    ];
    localStorage.setItem("adminAccounts", JSON.stringify(defaultAdmins));
  }

  const form = document.getElementById("adminLoginForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const remember = document.getElementById("rememberAdmin").checked;

      const accounts = JSON.parse(localStorage.getItem("adminAccounts")) || [];

      const matched = accounts.find(
        (acc) => acc.username === username && acc.password === password
      );

      // LƯU GHI NHỚ
      if (remember) {
        localStorage.setItem("rememberedUser1", username);
        localStorage.setItem("rememberedPass1", password);
      } else {
        localStorage.removeItem("rememberedUser1");
        localStorage.removeItem("rememberedPass1");
      }

      if (matched) {
        localStorage.setItem("loggedInAdmin", username);
        alert("✅ Đăng nhập thành công!");
        window.location.href = "admin-index.html";
      } else {
        alert("❌ Sai tên đăng nhập hoặc mật khẩu!");
      }
    });
  } else {
    console.error("Không tìm thấy form có id='adminLoginForm'");
  }
});
