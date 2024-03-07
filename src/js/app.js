import Container from '../components/container/container';
import Column from '../components/column/column';


new Container(document.body);
const column = new Column(document.querySelector('main'));

for (let title of ['todo', 'in progress', 'done']) {
  column.addColumn(title);
}
