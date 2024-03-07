import Container from '../components/container/container';
import Column from '../components/column/column';
import CardWidget from '../components/cardWidget/cardWidget';

new Container(document.body);
const column = new Column(document.querySelector('main'));

for (const title of ['todo', 'in progress', 'done']) {
  column.addColumn(title);
}

new CardWidget();
