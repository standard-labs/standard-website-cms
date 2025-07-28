import { PLUGIN_ID } from '../../pluginId';
import { CUSTOM_FIELDS_IDS_MAP } from '../../../../lib/custom-fields';
import Icon from './icon';


export const FIELD_ID = CUSTOM_FIELDS_IDS_MAP.color_picker;

export default {
  name: FIELD_ID,
  type: 'json',
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID}.label`,
    defaultMessage: 'Color Picker',
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID}.description`,
    defaultMessage: 'A custom Strapi field that lets users pick and save HEX color values easily.',
  },
  icon: Icon,
  components: {
    Input: async () => import('./input'),
  },
}