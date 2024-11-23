import { createI18n } from 'vue-i18n';
import messages from 'src/localization';

export default ({ app }) => {
  const i18n = createI18n({
    locale: 'bg',
    messages
  });

  app.use(i18n);
};
