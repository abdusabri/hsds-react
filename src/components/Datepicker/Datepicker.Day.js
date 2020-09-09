import React, { useRef, useContext } from 'react'
import { useDay } from '@datepicker-react/hooks'
import { getColor } from '../../styles/utilities/color'
import DatepickerContext from './Datepicker.Context'
import { getDayColor, isToday } from './Datepicker.utils'
import { DayUI } from './Datepicker.css'

function Day({ dayLabel, date, leading, trailing }) {
  const dayRef = useRef(null)
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
  } = useContext(DatepickerContext)
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  })

  if (!dayLabel) {
    return <div />
  }

  const isDateToday = isToday(date)
  const getColorFn = getDayColor(
    isSelected,
    isDateToday,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    leading,
    trailing
  )

  return (
    <DayUI
      disabled={disabledDate}
      isSelected={isSelected}
      isDateToday={isDateToday}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      labelColor={getColorFn({
        selectedFirstOrLastColor: '#FFFFFF',
        normalColor: getColor('charcoal.600'),
        selectedColor: '#FFFFFF',
        rangeHoverColor: getColor('blue.200'),
        disabledColor: '#808285',
        inactiveMonthColor: getColor('charcoal.200'),
        todayColor: getColor('charcoal.700'),
      })}
      bgColor={getColorFn({
        selectedFirstOrLastColor: getColor('blue.500'),
        normalColor: '#FFFFFF',
        selectedColor: getColor('blue.500'),
        rangeHoverColor: getColor('blue.600'),
        disabledColor: '#FFFFFF',
        inactiveMonthColor: '#FFFFFF',
        todayColor: getColor('grey.300'),
      })}
    >
      {dayLabel}
    </DayUI>
  )
}

Day.defaultProps = {
  leading: false,
  trailing: false,
}

export default Day
