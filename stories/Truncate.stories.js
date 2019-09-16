import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { Truncate } from '../src/index'

const fixture = createSpec(faker.lorem.paragraph())

const stories = storiesOf('Truncate', module)
const limit = 10

stories.add('default', () => (
  <div>
    <p style={{ width: '50%' }}>
      Auto:
      <br />
      <Truncate showTooltipOnTruncate>{fixture.generate()}</Truncate>
    </p>
    <p>
      Start:
      <br />
      <Truncate type="start" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Middle:
      <br />
      <Truncate type="middle" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      End:
      <br />
      <Truncate type="end" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p style={{ width: '25%' }}>
      Truncate by Splitter:
      <br />
      <Truncate type="start" limit={limit} splitter="@">
        longemailaddress@gmail.com
      </Truncate>
    </p>
    <br />
  </div>
))

stories.add('tooltip', () => (
  <div>
    <p>
      Auto:
      <br />
      <Truncate showTooltipOnTruncate>{fixture.generate()}</Truncate>
    </p>
    <p>
      Start:
      <br />
      <Truncate showTooltipOnTruncate type="start" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Middle:
      <br />
      <Truncate showTooltipOnTruncate type="middle" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      End:
      <br />
      <Truncate showTooltipOnTruncate type="end" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <br />
  </div>
))
