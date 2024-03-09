export function getColumnHtml(title) {
  const html = `
      <header class="column-header">
          <div class="column-header-title">${title.toUpperCase()}</div>
          <button class="column-header-btn">...</button>
      </header>
      <main class="column-main"></main>
      <footer class="column-footer">
          <button class="column-footer-btn">
              <span class="column-add-card-btn">Add new card</span>
          </button>
      </footer>
  `;
  return html;
}
