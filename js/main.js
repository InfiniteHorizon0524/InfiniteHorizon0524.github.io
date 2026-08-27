/* =====================================================================
   InfiniteHorizon · 个人主页交互逻辑
   功能：导航栏滚动态 / 移动端菜单 / 滚动显现 /
        滚动高亮当前区块 / 页脚年份
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- 导航栏滚动态 ---------- */
  const navbar = document.getElementById("navbar");
  const onScrollNav = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
  });

  // 点击菜单项后收起
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );

  /* ---------- 打字机效果 ---------- */
  /* （已随「文章式首页」移除，如后续需要可在此恢复） */

  /* ---------- 滚动显现（用于博客等子页面） ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- 滚动高亮当前区块 ---------- */
  // 仅对站内锚点（#xxx）做滚动高亮；跨页链接（如 ../index.html#home）不参与
  const navItems = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navItems
    .map((item) => item.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .map((href) => document.querySelector(href))
    .filter(Boolean);

  const spyIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navItems.forEach((item) => {
          const match = item.getAttribute("href") === `#${id}`;
          item.classList.toggle("active", match);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spyIO.observe(s));

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll(".js-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
