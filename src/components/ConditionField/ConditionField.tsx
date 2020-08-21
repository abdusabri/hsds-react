import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Flexy from '../Flexy'
import IconButton from '../IconButton'
import Tooltip from '../Tooltip'
import Group from './ConditionField.Group'
import Or from './ConditionField.Or'
import Static from './ConditionField.Static'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionFieldProps } from './ConditionField.types'
import { COMPONENT_KEY } from './ConditionField.utils'
import {
  FieldWrapperUI,
  FieldUI,
  FieldContentWrapperUI,
  FieldCloseWrapperUI,
} from './styles/ConditionField.css'

export class ConditionField extends React.PureComponent<ConditionFieldProps> {
  static className = 'c-ConditionField'
  static defaultProps = {
    closeIcon: 'collapse',
    innerRef: noop,
    isWithOr: false,
    isWithRemove: true,
    onRemove: noop,
    removeTitle: 'Remove',
    tooltipDelay: 800,
    tooltipDuration: 60,
  }

  static Static = Static
  static Group = Group
  static Block = Flexy.Block
  static Item = Flexy.Item

  getClassName() {
    const { className } = this.props
    return classNames(ConditionField.className, className)
  }

  renderOperator() {
    const { isWithOr } = this.props
    if (!isWithOr) return null

    return <Or />
  }

  render() {
    const {
      children,
      closeIcon,
      innerRef,
      isWithRemove,
      onRemove,
      removeTitle,
      tooltipDelay,
      tooltipDuration,
      ...rest
    } = this.props

    return (
      <FieldWrapperUI data-cy="ConditionFieldWrapper">
        {this.renderOperator()}
        <FieldUI {...rest} className={this.getClassName()}>
          <FieldContentWrapperUI data-cy="ConditionFieldContentWrapper">
            <Flexy align="top" gap="md">
              {children}
            </Flexy>
          </FieldContentWrapperUI>
          <FieldCloseWrapperUI data-cy="ConditionFieldCloseWrapper">
            <Tooltip
              title={removeTitle}
              animationDelay={tooltipDelay}
              animationDuration={tooltipDuration}
            >
              {isWithRemove ? (
                <IconButton
                  data-cy="ConditionFieldRemoveButton"
                  icon={closeIcon}
                  onClick={onRemove}
                />
              ) : null}
            </Tooltip>
          </FieldCloseWrapperUI>
        </FieldUI>
      </FieldWrapperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Field)(ConditionField)

export default PropConnectedComponent