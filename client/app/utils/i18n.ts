import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';

i18next
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig,
    react: {
      useSuspense: false,
    },
  });

export default appWithTranslation;