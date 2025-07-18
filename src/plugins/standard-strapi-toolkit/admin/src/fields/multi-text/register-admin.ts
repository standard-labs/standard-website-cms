import { FIELD_ID } from './field-id';
import { BulletList } from '@strapi/icons';

export default {
  name: FIELD_ID,
  type: 'json',
  intlLabel: {
    id: 'standard-strapi-toolkit.multi-text.label',
    defaultMessage: 'Multi Text',
  },
  intlDescription: {
    id: 'standard-strapi-toolkit.multi-text.description',
    defaultMessage: 'A list of custom text values (e.g. tags)',
  },
  icon: BulletList,
  components: {
    Input: async () => import('./input'),
  },
}