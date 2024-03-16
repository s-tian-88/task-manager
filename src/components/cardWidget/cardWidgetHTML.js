export function getCardWidgetHTML() {
  const html = `
  <input class="card-widget-title" type="text" placeholder="Input task title..." required>
  <textarea class="card-widget-description" placeholder="Description..." required></textarea>
  <div class="card-widget-buttons">
    <button class="card-widget-add btn"></button>
    <button class="card-widget-clean btn"></button>
    <button class="card-widget-break btn"></button>
  </div>
  `;
  return html;
}
