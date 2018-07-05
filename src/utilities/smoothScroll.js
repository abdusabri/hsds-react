import { isNodeElement } from './node'
import { requestAnimationFrame } from './other'

// Source:
// https://gist.github.com/gre/1650294
const easeInOutCubic = t => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// Source
// https://jsfiddle.net/s61x7c4e/
//
// Testing:
// Note: This function cannot be tested in JSDOM. JSDOM lacks the
// necessary DOM node numbers (like scrollY or scrollTop) to test
// the calculations for this method. These numbers cannot be
// mocked/faked :(.
//
// To properly test this method, we'll need to leverage ACTUAL
// browser testing somehow (either in-browser or headless).
//
// For now, this method has been extensively tested manually
// within Storybook.
export const smoothScrollTo = ({ node, position, duration, direction }) => {
  const scrollNode = isNodeElement(node) ? node : window
  const isWindow = scrollNode === window
  const scrollDuration = duration || 500
  const scrollDirection = direction || 'y'
  const isHorizontalScroll = scrollDirection === 'x'

  let currentScrollPosition = isWindow ? window.scrollY : scrollNode.scrollTop
  if (isHorizontalScroll) {
    currentScrollPosition = isWindow ? window.scrollX : scrollNode.scrollLeft
  }

  let diff = currentScrollPosition - position
  let start

  if (!diff) return

  const step = timestamp => {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start
    // Get percent of completion in range [0, 1].
    const percent = easeInOutCubic(Math.min(time / scrollDuration, 1))
    const scrollToPosition = currentScrollPosition - diff * percent

    if (isHorizontalScroll) {
      node.scrollTo(scrollToPosition, 0)
    } else {
      node.scrollTo(0, scrollToPosition)
    }

    // Proceed with animation as long as we wanted it to.
    if (time < scrollDuration) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
