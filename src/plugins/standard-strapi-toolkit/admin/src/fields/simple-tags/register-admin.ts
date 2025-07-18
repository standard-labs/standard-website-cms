import { PLUGIN_ID } from '../../pluginId';
import { CUSTOM_FIELDS_IDS_MAP } from '../../../../lib/custom-fields';
import Icon from './icon';


export const FIELD_ID = CUSTOM_FIELDS_IDS_MAP['simple_tags'];

export default {
  name: FIELD_ID,
  type: 'json',
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID}.label`,
    defaultMessage: 'Simple Tags',
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID}.description`,
    defaultMessage: 'A flat list of custom text tags. Example: ["summer", "sale"]',
  },
  icon: Icon,
  components: {
    Input: async () => import('./input'),
  },
}
