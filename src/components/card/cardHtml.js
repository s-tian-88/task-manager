export function getCardHtml(title, description) {
  const html = `
  <div class="card-title"><span cjhk:wlass="card-title-content">${title}</span></div>
  <article class="card-description-content">${description}</article>
  <div class="card-buttons">
    <button class="delete card-btn hide">Delete</button>
  </div>
  `;
  return html;
}
