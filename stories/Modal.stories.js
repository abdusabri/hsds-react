import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  AutoDropdown,
  Button,
  FormLabel,
  Heading,
  Modal,
  Link,
  PropProvider,
  Popover,
  Input,
  Switch,
  Toolbar,
  styled,
} from '../src/index'
import { FrameProvider } from '../src/components/styled'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import { createSpec, faker } from '@helpscout/helix'
import Frame from 'react-frame-component'
import { withAktiv } from './utils'

import SpeechBubble from '@helpscout/hsds-illos/speech-bubble'

const stories = storiesOf('Modal', module).addDecorator(withAktiv)

const ContentSpec = createSpec({
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
})

class StatefulComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      value: '',
    }
    this.handleOnButtonClick = this.handleOnButtonClick.bind(this)
    this.handleOnInputChange = this.handleOnInputChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnModalOpen = this.handleOnModalOpen.bind(this)
    this.handleOnModalClose = this.handleOnModalClose.bind(this)
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
  }

  componentWillMount() {
    window.addEventListener('keyup', this.handleOnKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleOnKeyUp)
  }

  handleOnKeyUp(event) {
    console.log(event)
  }

  handleOnButtonClick() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleOnInputChange(value) {
    this.setState({
      value,
    })
  }

  handleOnModalOpen() {
    const inputNode = document.querySelector('input')
    if (inputNode) {
      inputNode.focus()
    }
  }

  handleOnModalClose() {
    this.setState({
      showModal: false,
    })
  }

  handleOnSubmit() {
    this.setState({
      showModal: false,
      value: '',
    })
  }

  render() {
    const { showModal, value } = this.state

    const triggerMarkup = (
      <Button
        onClick={this.handleOnButtonClick}
        theme={value ? 'editing' : null}
      >
        {value ? 'Keep Editing' : 'Reply'}
      </Button>
    )

    return (
      <Modal trigger={<button>Open</button>}>
        <Modal.Body>
          <Modal.Content>
            <Modal
              closeIcon={false}
              isOpen={showModal}
              trigger={triggerMarkup}
              onOpen={this.handleOnModalOpen}
              onClose={this.handleOnModalClose}
            >
              <Modal.Body>
                <Modal.Content>
                  <Input
                    autoFocus
                    multiline={3}
                    maxHeight={140}
                    onChange={this.handleOnInputChange}
                    value={value}
                    scrollLock={false}
                  />
                  <Button onClick={this.handleOnSubmit} primary>
                    Submit
                  </Button>
                </Modal.Content>
              </Modal.Body>
            </Modal>
          </Modal.Content>
        </Modal.Body>
      </Modal>
    )
  }
}

stories.addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
))

stories.add('default', () => (
  <Modal trigger={<Link>Open dis modal</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
  </Modal>
))

stories.add('v2 styles', () => (
  <Modal version="2" trigger={<Link>Open dis modal</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
  </Modal>
))

stories.add('no close on escape', () => (
  <Modal closeOnEscape={false} trigger={<Link>Open dis modal</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
  </Modal>
))

stories.add('open', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Content>
      <Modal.Body>
        <Heading>Title</Heading>
        {ContentSpec.generate(1).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
      </Modal.Body>
    </Modal.Content>
  </Modal>
))

stories.add('header/footer', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Header>Header</Modal.Header>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.Footer>Footer</Modal.Footer>
  </Modal>
))

stories.add('header/footer styles', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Header seamless>Header</Modal.Header>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.Footer shadow>Footer</Modal.Footer>
  </Modal>
))

stories.add('header/footer with items', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>} closeIcon={false}>
    <Modal.Content>
      <Modal.Header>
        <Toolbar.Item>
          <Heading size="h4">Heading</Heading>
        </Toolbar.Item>
        <Toolbar.Block />
        <Toolbar.Item>
          <Button>Action</Button>
        </Toolbar.Item>
      </Modal.Header>
      <Modal.Body>
        <Heading size="h4">Inner Heading</Heading>
        {ContentSpec.generate(8).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Toolbar.Item>
          <Button>Another Action</Button>
        </Toolbar.Item>
        <Toolbar.Block />
        <Toolbar.Item>
          <Button plain>Action</Button>
        </Toolbar.Item>
        <Toolbar.Item>
          <Button primary>Primary</Button>
        </Toolbar.Item>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
))

stories.add('with tooltip', () => (
  <Modal trigger={<Link>Clicky</Link>} isSeamless isOpen>
    <Modal.Content>
      <Modal.Header>
        <Heading size="h4">Heading</Heading>
      </Modal.Header>
      <Modal.Body>
        <Input state={'error'} errorMessage={'Shoot! Something is wrong.'} />
      </Modal.Body>
    </Modal.Content>
  </Modal>
))

stories.add('custom close trigger', () => {
  class Contents extends React.Component {
    render() {
      return (
        <p>
          <button onClick={this.context.closePortal}>Close me</button>
        </p>
      )
    }
  }

  Contents.contextTypes = {
    closePortal: () => {},
  }

  return (
    <Modal trigger={<Link>Open me</Link>}>
      <Contents />
    </Modal>
  )
})

stories.add('seamless', () => (
  <Modal trigger={<Link>Clicky</Link>} seamless isOpen>
    <Modal.Content>
      {ContentSpec.generate(8).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Content>
  </Modal>
))

stories.add('nested', () => (
  <Modal trigger={<Link>Clicky</Link>}>
    <Modal.Body>
      <Heading>Title</Heading>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}

      <Modal trigger={<Link>Level 2</Link>}>
        <Modal.Body>
          <Heading>Level 2</Heading>

          <Popover content="Popover! Let's go to level 3." zIndex={99999}>
            <Button>Popover</Button>
          </Popover>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}

          <Modal trigger={<Link>Level 3</Link>}>
            <Modal.Body>
              <Heading>Level 3</Heading>
              {ContentSpec.generate(2).map(({ id, content }) => (
                <p key={id}>{content}</p>
              ))}
              <AutoDropdown />
            </Modal.Body>
          </Modal>

          <AutoDropdown />
        </Modal.Body>
      </Modal>
    </Modal.Body>
  </Modal>
))

stories.add('custom mounting selector', () => {
  return (
    <div>
      <p>Render modal here:</p>
      <div className="render-modal-here" />

      <Modal trigger={<Link>Clicky</Link>} renderTo=".render-modal-here">
        <Modal.Body>
          <Heading>Title</Heading>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
})

stories.add('lifecycle events', () => {
  const onBeforeOpen = modalOpen => {
    console.log('Before open!')
    setTimeout(() => {
      modalOpen()
    }, 500)
  }
  const onBeforeClose = modalClose => {
    console.log('Before close!')
    setTimeout(() => {
      modalClose()
    }, 500)
  }
  return (
    <div>
      <p>onBeforeOpen: 500 delay</p>
      <p>onBeforeClose: 500 delay</p>
      <Modal
        className="weee"
        onBeforeOpen={onBeforeOpen}
        onBeforeClose={onBeforeClose}
        trigger={<Link>Clicky</Link>}
      >
        <Modal.Body>
          <Heading>Title</Heading>
          {ContentSpec.generate(2).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  )
})

stories.add('routes', () => {
  return (
    <div>
      <h1>Routes</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
        <li>
          <Link to="/team/brick">Brick</Link>
        </li>
      </ul>

      <Modal path="/team">
        <Modal.Body>
          <h1>Team Modal: A</h1>
          <p>Modal content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: B</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: C</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: D</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Modal path="/team/brick">
        <Modal.Body>
          <h1>Team Modal: E</h1>
          <p>Modal inner content</p>
        </Modal.Body>
      </Modal>

      <Route
        exact
        path="/"
        render={props => (
          <div>
            <h1>HOME PAGE</h1>
          </div>
        )}
      />
      <Route
        path="/team"
        render={props => (
          <div>
            <h1>TEAM PAGE</h1>
          </div>
        )}
      />
    </div>
  )
})

stories.add('stateful example', () => (
  <div>
    <button>Does Nothing</button>
    <hr />
    <StatefulComponent />
  </div>
))

stories.add('tabbing', () => (
  <Modal isOpen trigger={<Link>Clicky</Link>}>
    <Modal.Content>
      <Modal.Body>
        <Heading>Title</Heading>
        <button>One</button>
        {ContentSpec.generate(6).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
        <button>Two</button>
        <button>Three</button>
        {ContentSpec.generate(6).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
        <button>Four</button>
      </Modal.Body>
    </Modal.Content>
  </Modal>
))

class HSAppExample extends React.Component {
  state = {
    hsApp: true,
    isOpen: true,
  }

  toggle = () => {
    this.setState({
      hsApp: !this.state.hsApp,
    })
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    const app = this.state.hsApp ? 'hs-app' : 'blue'
    const value = {
      Button: {
        version: 2,
      },
    }
    return (
      <div>
        <button onClick={this.toggleModal}>Toggle Modal</button>
        {this.state.isOpen && (
          <Frame
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          >
            <FrameProvider>
              <PropProvider app={app} value={value}>
                <Modal isOpen onClose={this.closeModal}>
                  <Modal.Content>
                    <Modal.Body>
                      <Heading>Title</Heading>
                      <FormLabel label="See HS App styles">
                        <Switch
                          checked={this.state.hsApp}
                          onChange={this.toggle}
                        />
                      </FormLabel>
                      <Button kind="primary">Primary Button</Button>
                      <Button>Button</Button>
                      {ContentSpec.generate(12).map(({ id, content }) => (
                        <p key={id}>{content}</p>
                      ))}
                    </Modal.Body>
                  </Modal.Content>
                </Modal>
              </PropProvider>
            </FrameProvider>
          </Frame>
        )}
      </div>
    )
  }
}

stories.add('HSApp', () => <HSAppExample />)

stories.add('styled', () => {
  const StyledModal = styled(Modal)`
    .c-ModalOverlay {
      background: purple;
    }
  `

  return (
    <StyledModal isOpen>
      <Modal.Content>
        <Modal.Body>
          {ContentSpec.generate(12).map(({ id, content }) => (
            <p key={id}>{content}</p>
          ))}
        </Modal.Body>
      </Modal.Content>
    </StyledModal>
  )
})

const storiesV2 = storiesOf('Modal/V2', module).addDecorator(withAktiv)

storiesV2.add('default', () => (
  <Modal
    version={2}
    isOpen={true}
    trigger={<Link>Clicky</Link>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter primaryButtonText="Primary" />
  </Modal>
))

storiesV2.add('default w/ secondary button', () => (
  <Modal
    version={2}
    isOpen={true}
    trigger={<Link>Clicky</Link>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
))

storiesV2.add('default w/ danger state', () => (
  <Modal
    version={2}
    state="danger"
    isOpen={true}
    trigger={<Link>Clicky</Link>}
    icon="alert"
    title="Change Subdomain?"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(2).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter state="danger" primaryButtonText="Change Subdomain" />
  </Modal>
))

storiesV2.add('default w/ very long content', () => (
  <Modal
    version={2}
    isOpen={true}
    trigger={<Link>Clicky</Link>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(12).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
))

storiesV2.add('branded no description, single button', () => (
  <Modal
    version={2}
    isOpen={true}
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Link>Clicky</Link>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter primaryButtonText="Primary" />
  </Modal>
))

storiesV2.add('branded w/description, danger state', () => (
  <Modal
    version={2}
    isOpen={true}
    description="Before making it official we'd really appreciate your thoughts on what we can do to improve."
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Link>Clicky</Link>}
    title="Cancel your account?"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Cancel my account"
      state={'danger'}
    />
  </Modal>
))

storiesV2.add('branded w/description, secondary button', () => (
  <Modal
    version={2}
    isOpen={true}
    description="A really interesting description about lots of really interesting things goes here which should be no more than two lines."
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Link>Clicky</Link>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
))

storiesV2.add('branded w/ really long content', () => (
  <Modal
    version={2}
    isOpen={true}
    description="A really interesting description about lots of really interesting things goes here which should be no more than two lines."
    kind="branded"
    illo={<SpeechBubble />}
    trigger={<Link>Clicky</Link>}
    title="Modal Title"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(10).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter
      primaryButtonText="Primary"
      secondaryButtonText="Secondary"
    />
  </Modal>
))

storiesV2.add('alert, no description', () => (
  <Modal
    version={2}
    isOpen={true}
    kind="alert"
    trigger={<Link>Clicky</Link>}
    title="Discard this draft?"
  >
    <Modal.ActionFooter
      showDefaultCancel={false}
      kind={'alert'}
      primaryButtonText="Discard"
      secondaryButtonText="Cancel"
    />
  </Modal>
))

storiesV2.add('alert with description', () => (
  <Modal
    version={2}
    isOpen={true}
    description="Short title providing a little more detail."
    kind="alert"
    trigger={<Link>Clicky</Link>}
    title="Alert Title"
  >
    <Modal.ActionFooter
      showDefaultCancel={false}
      kind={'alert'}
      primaryButtonText="Yes, do it"
      secondaryButtonText="Cancel"
    />
  </Modal>
))

storiesV2.add('alert w/ danger state', () => (
  <Modal
    version={2}
    isOpen={true}
    kind="alert"
    description="You're about to do a thing that could impact a lot of other things. Continue?"
    state="danger"
    trigger={<Link>Clicky</Link>}
    title="Are you sure?"
  >
    <Modal.ActionFooter
      showDefaultCancel={false}
      kind={'alert'}
      state="danger"
      primaryButtonText="Yes, do it"
      secondaryButtonText="Cancel"
    />
  </Modal>
))

storiesV2.add('sequence', () => (
  <Modal
    version={2}
    isOpen={true}
    kind="sequence"
    description="We'll send a six digit code to confirm ownership."
    numSteps={5}
    step={2}
    trigger={<Link>Clicky</Link>}
    title="What email address would you like to connect?"
  >
    <Modal.Body version={2}>
      {ContentSpec.generate(1).map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
    </Modal.Body>
    <Modal.ActionFooter kind="default" primaryButtonText="Send code" />
  </Modal>
))
