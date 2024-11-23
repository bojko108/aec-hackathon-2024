import { boot } from 'quasar/wrappers';
import EventEmitter from 'src/events/EventEmitter';

export default boot(({ app }) => {
  app.config.globalProperties.$events = new EventEmitter();
});
