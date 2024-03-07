export function getCardHtml(title = 'Default title', description = 'Default description') {
  const html = `
  <div class="card-title"><span class="card-title-content">${title}</span></div>
  <article class="card-description-content">${description}</article>
  <div class="card-buttons">
    <button class="delete card-btn hide">Delete</button>
  </div>
  `;
  return html;
}
