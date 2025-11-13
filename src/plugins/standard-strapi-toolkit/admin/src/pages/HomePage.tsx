import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';


const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main padding={6}>
      <h1>
        Welcome to {formatMessage({ id: getTranslation('plugin.name') })}
      </h1>
      <p>
        This plugin provides additional features to enhance your CMS experience.
        {/* Testing */}
      </p>
    </Main>
  );
};

export { HomePage };
