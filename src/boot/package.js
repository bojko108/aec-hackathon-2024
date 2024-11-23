import { boot } from 'quasar/wrappers'

import * as props from '../../package.json';

export default boot(({ app }) => {
  app.config.globalProperties.$package = props;
})
