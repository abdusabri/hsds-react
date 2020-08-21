import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import SpeechBubble from '@helpscout/hsds-illos/speech-bubble'

export const BlankSlateUI = styled('div')`
  ${baseStyles}
  background-color: ${getColor('grey.200')};
`

export const SpeechBubbleIlloUI = styled(SpeechBubble)`
  display: block;
  margin: 0px auto -13px auto;
`

export const ContentUI = styled('div')`
  padding: 16px 20px 19px;
  text-align: center;
`

export default BlankSlateUI