import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';

/**
 * HomePage Component
 *
 * This is the main landing page of the plugin.
 * 
 * This plugin is developed to add **custom functionalities** 
 * to your Strapi CMS project, extending its capabilities 
 * without modifying the core CMS.
 */
const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main padding={6}>
      <h1>
        Welcome to {formatMessage({ id: getTranslation('plugin.name') })}
      </h1>
      <p>
        This plugin provides additional features to enhance your CMS experience.
      </p>
    </Main>
  );
};

export { HomePage };
