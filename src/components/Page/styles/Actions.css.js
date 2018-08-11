// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  marginBottom: 40,
  spacing: 10,
}

export const ActionsUI = styled('div')`
  ${baseStyles} display: flex;
  flex-direction: row-reverse;
  margin-left: -${config.spacing}px;
  margin-right: -${config.spacing}px;
  margin-bottom: ${config.marginBottom}px;
  padding: 12px 0;

  &.is-left {
    flex-direction: row;
  }

  &.is-right {
    flex-direction: row-reverse;
  }
`

export const ActionsItemUI = styled('div')`
  min-width: 0;
  margin: 0 ${config.spacing}px;
`

export const ActionsBlockUI = styled('div')`
  flex: 1;
  max-width: 100%;
  min-width: 0;
`

export default ActionsUI
