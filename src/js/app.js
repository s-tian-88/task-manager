import Column from '../components/Column/Column';
import Card from '../components/Card/Card';
import CardWidget from '../components/CardWidget/CardWidget';

const todo = new Column('todo', document.querySelector('.wall'));
const inProgress = new Column('in progress', document.querySelector('.wall'));
const done = new Column('done', document.querySelector('.wall'));
