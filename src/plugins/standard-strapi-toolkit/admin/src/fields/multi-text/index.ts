import { Alien } from '@strapi/icons';
import MultiText from './multi-text';

export default {
  name: 'multi-text',
  type: 'json',
  intlLabel: {
    id: 'multi-text.label',
    defaultMessage: 'Multi Text',
  },
  intlDescription: {
    id: 'multi-text.description',
    defaultMessage: 'Enter multiple tags or string items',
  },
  icon: Alien,
  components: {
    Input: MultiText,
  },
};
