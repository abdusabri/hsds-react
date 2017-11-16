import React, {PureComponent as Component} from 'react'
import { storiesOf } from '@storybook/react'
import {
  Avatar,
  AvatarList,
  Button,
  ChatInbox,
  ChatList,
  ChatSidebar,
  Flexy
} from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'
import ChatSpec from '../ChatList/specs/Chat'

ChatSpec.afterGenerate(({isTyping, ...rest}) => {
  return {
    ...rest,
    isTyping: false
  }
})

const avatars = AvatarSpec.generate(8)

const stories = storiesOf('ChatSidebar', module)

class SampleComponent extends Component {
  constructor () {
    super()
    this.state = {
      chatAvatars: avatars,
      chats: [],
      hasNewMessage: false,
      collapseAssignedInbox: true
    }
    this.handleOnAddMessage = this.handleOnAddMessage.bind(this)
    this.handleOnBloopClose = this.handleOnBloopClose.bind(this)
  }

  handleOnAddMessage () {
    const { chats } = this.state
    this.setState({
      chats: [...chats, ChatSpec.generate()]
      // hasNewMessage: true
    })
  }

  handleOnBloopClose () {
    this.setState({ hasNewMessage: false })
  }

  render () {
    const {
      chatAvatars,
      chats,
      collapseAssignedInbox
    } = this.state
    const handleOnAddMessage = this.handleOnAddMessage
    const handleOnBloopClose = this.handleOnBloopClose

    const messageMarkup = chats.map((item, index) => {
      const avatar = (
        <Avatar
          image={avatars[4].image}
          name={avatars[4].name}
          size='sm' shape='rounded'
        />
      )

      return (
        <ChatList.Item
          key={item.id}
          avatar={item.isAssigned ? avatar : null}
          isAssigned={item.isAssigned}
          isFocused={index === 2}
          isTyping={item.isTyping}
          isViewing={item.isViewing}
          isWaiting={item.isWaiting}
          message={item.message}
          name={item.name}
          newMessageCount={item.newMessageCount}
          tags={item.tags}
          timestamp={item.timestamp}
        />
      )
    })

    const sidebarMarkup = (
      <div style={{width: 300, height: '100vh'}}>
        <ChatSidebar
          newMessageCount={chats.length}
          onBloopClose={handleOnBloopClose}
        >
          <ChatInbox>
            <ChatInbox.Header
              avatars={
                <AvatarList avatars={chatAvatars} max={3} />
              }
              count={chats.length}
            >
              Chats
            </ChatInbox.Header>
            <ChatInbox.Content>
              <ChatList>
                {messageMarkup}
              </ChatList>
            </ChatInbox.Content>
          </ChatInbox>

          <ChatInbox isCollapsible={collapseAssignedInbox}>
            <ChatInbox.Header
              avatars={
                <AvatarList avatars={chatAvatars} max={3} />
              }
              count={7}
            >
              Assigned
            </ChatInbox.Header>
            <ChatInbox.Content>
              <ChatList>
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
                <ChatList.Item />
              </ChatList>
            </ChatInbox.Content>
          </ChatInbox>
        </ChatSidebar>
      </div>
    )
    return (
      <Flexy align='top'>
        <Flexy.Item>
          {sidebarMarkup}
        </Flexy.Item>
        <Flexy.Block>
          <Button onClick={handleOnAddMessage}>Add New Message</Button>
        </Flexy.Block>
      </Flexy>
    )
  }
}

stories.add('default', () => (
  <SampleComponent />
))
