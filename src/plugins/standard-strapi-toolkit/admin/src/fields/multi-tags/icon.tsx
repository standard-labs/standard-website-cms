import React from 'react'
import styled from 'styled-components'
import { Flex } from '@strapi/design-system'
import { GridFour } from '@strapi/icons'


const IconBox = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`

const Icon: React.FC = () => {
  return (
    <IconBox hasRadius>
      <GridFour />
    </IconBox>
  )
}

export default Icon
