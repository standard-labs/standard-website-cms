import { FIELD_ID } from './field-id';
import { GridNine } from '@strapi/icons';

export default {
  name: FIELD_ID,
  type: 'json',
  intlLabel: {
    id: 'standard-strapi-toolkit.text-matrix.label',
    defaultMessage: 'Text Matrix',
  },
  intlDescription: {
    id: 'standard-strapi-toolkit.text-matrix.description',
    defaultMessage: 'A list of custom text values (e.g. tags)',
  },
  icon: GridNine,
  components: {
    Input: async () => import('./input'),
  },
}