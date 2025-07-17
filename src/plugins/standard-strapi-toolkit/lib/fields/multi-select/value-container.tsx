import { Tag } from '@strapi/design-system';
import { Cross } from '@strapi/icons';

const ValueContainer = ({
  selectProps,
  data,
}: {
  selectProps: any;
  data: {
    value: string;
    label: string;
  };
}) => {
  const handleTagClick = (data: { value: string; label: string }) => (e: React.UIEvent<any>) => {
    e.preventDefault();
    selectProps.onChange(selectProps.value.filter((v: any) => v !== data));
  };
  return (
    <Tag tabIndex={-1} icon={<Cross />} onClick={handleTagClick(data)}>
      {data.label}
    </Tag>
  );
};

export default ValueContainer;
