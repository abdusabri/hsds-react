// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import linkStyles from '../../../styles/mixins/linkStyles.css.js'
import { makeStateColorStyles } from '../../../styles/mixins/stateStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import { TEXT_SHADES } from '../../../styles/configs/constants'

export const VAR_NAMESPACE_SIZE = 'BlueConfigTextFontSize'
export const BASE_FONT_SIZE = 13
export const TEXT_SIZES = [10, 11, 12, 13, 14, 15, 16, 20, 48]

const css = `
  ${baseStyles}
  line-height: 1.5;

  &.is-disableSelect {
    user-select: none;
  }

  ${makeShadeStyles()}
  ${makeSizeStyles()}
  ${makeStateColorStyles()}

  &.is-truncate {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.is-word-wrap {
    word-break: break-word;
  }

  &.is-no-wrap {
    white-space: nowrap;
  }

  &.is-line-height-reset {
    line-height: 1;
  }

  &.is-all-caps {
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  &.is-block {
    display: block;
  }

  &.is-center {
    text-align: center;
  }

  &.is-linkStyle {
    ${linkStyles()}
  }

  &.is-samp {
    font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
    font-family: var(--BlueConfigGlobalFontFamilyMono);
  }
`

function makeShadeStyles(): string {
  return forEach(
    TEXT_SHADES,
    shade => `
    &.is-${shade} {
      color: ${getColor('text', shade)};
    }
  `
  )
}

function makeSizeStyles(): string {
  return forEach(
    TEXT_SIZES,
    size => `
    &.is-${size} {
      ${variableFontSize({
        varName: VAR_NAMESPACE_SIZE,
        baseFontSize: BASE_FONT_SIZE,
        fontSize: size,
      })}
    }
  `
  )
}

export default css