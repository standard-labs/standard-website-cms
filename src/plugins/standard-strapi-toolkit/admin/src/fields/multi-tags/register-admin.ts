import { PLUGIN_ID } from '../../pluginId';
import { CUSTOM_FIELDS_IDS_MAP } from '../../../../lib/custom-fields';
import Icon from './icon';


export const FIELD_ID = CUSTOM_FIELDS_IDS_MAP['multi_tags'];

export default {
  name: FIELD_ID,
  type: 'json',
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID}.label`,
    defaultMessage: 'Text Matrix',
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID}.description`,
    defaultMessage: 'A nested list (2D array) of grouped tags. Example: [["red", "blue"], ["S", "M", "L"]]',
  },
  icon: Icon,
  components: {
    Input: async () => import('./input'),
  },
}