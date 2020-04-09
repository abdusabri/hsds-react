import React from 'react'
import PropTypes from 'prop-types'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Text from '../Text'
import Action from './Message.Action'
import Attachment from './Message.Attachment'
import Bubble from './Message.Bubble'
import Caption from './Message.Caption'
import Chat from './Message.Chat'
import Content from './Message.Content'
import Embed from './Message.Embed'
import Media from './Message.Media'
import Provider from './Message.Provider'
import { classNames } from '../../utilities/classNames'
import { getComponentName } from '../../utilities/component'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { MessageUI } from './Message.css'

export class Message extends React.PureComponent {
  static propTypes = {
    avatar: PropTypes.any,
    showAvatar: PropTypes.bool,
  }

  static defaultProps = {
    showAvatar: true,
  }
  static contextTypes = {
    theme: noop,
  }
  static Action = Action
  static Attachment = Attachment
  static Bubble = Bubble
  static Caption = Caption
  static Chat = Chat
  static Content = Content
  static Embed = Embed
  static Media = Media
  static Provider = Provider

  shouldShowAvatar = () => {
    const { from, showAvatar } = this.props

    // This prevents spacing issues when children include
    // `Message.Action` which requires the full width of the screen.
    if (this.childrenIncludeActionTypeComponent()) return false

    return this.isThemeEmbed() ? (from && showAvatar) || false : !!showAvatar
  }

  childrenIncludeActionTypeComponent = () => {
    const { children } = this.props
    const childArray = React.Children.toArray(children)

    return childArray.some(child => {
      const componentName = getComponentName(child)

      return componentName === 'MessageAction'
    })
  }

  isThemeEmbed = () => {
    const { theme } = this.context
    return theme === 'embed'
  }

  getAvatarMarkup = () => {
    const { avatar } = this.props
    const isThemeEmbed = this.isThemeEmbed()

    if (!this.shouldShowAvatar()) return null

    const avatarMarkup = avatar
      ? React.cloneElement(avatar, {
          shape: 'circle',
          size: isThemeEmbed ? 'xxs' : 'xs',
        })
      : null

    return (
      <Flexy.Item className="c-Message__avatar-block">
        {avatarMarkup}
      </Flexy.Item>
    )
  }

  getChildrenMarkup = () => {
    const { children, from, ltr, rtl, to } = this.props

    return React.Children.map(children, child => {
      if (!child) return child

      return React.cloneElement(child, {
        from,
        ltr,
        rtl,
        to,
      })
    })
  }

  getFromMarkup = () => {
    const { from } = this.props
    const fromName = isString(from) ? from : null

    if (!(this.isThemeEmbed() && fromName)) return null

    return (
      <div className="c-Message__from">
        <Text
          className="c-Message__fromText"
          block
          lineHeightReset
          shade="faint"
          size="11"
        >
          {fromName}
        </Text>
      </div>
    )
  }

  render() {
    const {
      avatar,
      children,
      className,
      isNote,
      ltr,
      rtl,
      from,
      showAvatar,
      to,
      ...rest
    } = this.props
    const { theme } = this.context

    const componentClassName = classNames(
      'c-Message',
      avatar && 'has-avatar',
      from && 'is-from',
      theme && `is-theme-${theme}`,
      to && 'is-to',
      className
    )

    const avatarMarkup = this.getAvatarMarkup()
    const childrenMarkup = this.getChildrenMarkup()
    const fromMarkup = this.getFromMarkup()

    return (
      <MessageUI {...getValidProps(rest)} className={componentClassName}>
        {fromMarkup}
        <Flexy align="top" gap="xs">
          {from && avatarMarkup}
          <Flexy.Block className="c-Message__block">
            {childrenMarkup}
          </Flexy.Block>
          {to && avatarMarkup}
        </Flexy>
      </MessageUI>
    )
  }
}

export default Message