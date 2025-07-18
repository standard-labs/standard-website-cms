import { Flex } from "@strapi/design-system"
import { Badge } from "@strapi/design-system"
import { Cross } from "@strapi/icons";
import React from "react";



type Props = {
  text: string;
  onRemove: () => void;
}
export const TagView: React.FC<Props> = ({ text, onRemove }) => {
  return (
    <Badge variant="primary">
      <Flex gap={1}>
        {text}
        <Cross style={{ cursor: 'pointer' }} onClick={() => onRemove()} />
      </Flex>
    </Badge>
  )
}
