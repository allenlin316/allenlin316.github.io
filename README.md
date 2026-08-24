[![hackmd-github-sync-badge](https://hackmd.io/YDVAdaDFS5OgBrVQydfkVQ/badge)](https://hackmd.io/YDVAdaDFS5OgBrVQydfkVQ)
![狀態:開發中](https://img.shields.io/badge/status-developing-orange)

# Allen's Website

[Click here to my Website](https://allenlin316.github.io/)

個人網站與部落格：放我的經歷、專案，以及學習筆記與生活分享。純靜態網站，沒有建置流程。

## 頁面

| 頁面 | 路徑 | 內容 |
| --- | --- | --- |
| Home | `index.html` | 關於我、技能、證照與獎項、工作經歷、專案、教育背景 |
| Blog | `blog/index.html` | 文章列表，支援關鍵字搜尋與分類 |
| Archive | `archive.html` | 歷年專案與筆記的時間軸，支援關鍵字搜尋 |
| 文章 | `blog/*.html` | 各篇文章 |
| 分類 | `blog-categories/*.html` | 程式筆記、國外生活、課外書籍分享、推甄經歷 |

## 技術

* **Tailwind CSS v3**（Play CDN，載入 `forms`、`container-queries` plugin），設定在 `script/tailwind-config.js`
* **Design tokens**：`style/tokens.css` 是所有顏色、字級、間距、圓角、陰影、z-index 的單一來源。顏色以 `R G B` 三元組儲存，讓 Tailwind 的透明度修飾字（如 `bg-secondary/10`）能正常運作
* **自訂樣式**：`style/style.css`，建立在 tokens 之上
* **原生 JavaScript**（`script/site.js`，無框架）：深色/淺色切換、手機選單、相簿輪播、進場動畫、關鍵字過濾、目錄 scrollspy
* **Google Analytics 4** 與 **Google Search Console**

> 註：Tailwind Play CDN 是在 runtime 注入 `<style>`，會排在 `style/style.css` 之後。若自訂樣式與 Tailwind 的 preflight 或 `forms` plugin 選擇器特異性相同，會被蓋掉 —— 這時把選擇器加上元素限定（例如 `input.search-input`）提高特異性即可，不需要 `!important`。

## 目錄結構

```
index.html            首頁
archive.html          時間軸
blog/                 文章與文章列表
blog-categories/      分類頁
script/
  site.js             全站互動（20 個頁面共用）
  tailwind-config.js  Tailwind 設定，把 tokens 接進 Tailwind
  script.js           舊版腳本，僅剩 to-kill-a-mockingbird.html 使用
style/
  tokens.css          design tokens
  style.css           站台樣式
images/               圖片
sitemap.xml           sitemap
```

## 本機開發

沒有相依套件，也不需要建置。在專案根目錄起一個靜態伺服器即可：

```bash
python -m http.server 8000
```

然後開 http://127.0.0.1:8000/。

用根目錄起服務很重要：站上的連結都是絕對路徑（`/style/tokens.css`、`/blog/index.html`），這樣行為才會跟 GitHub Pages 一致。

改了 CSS 或 JS 後如果畫面沒變，多半是瀏覽器快取，用 Ctrl+Shift+R 硬重載。

## 部署

GitHub Pages 直接從 `main` branch 根目錄發布，沒有 CI workflow —— push 上去就會更新。

###### tags: `My_Website`
