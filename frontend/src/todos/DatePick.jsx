import React from 'react'
import { Typography } from '@mui/material'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePick = ({ date, done, handleChange }) => {
  const renderDueText = () => 'Due ' + moment(date).fromNow()
  const isOverdue = () => !done && moment().diff(moment(date)) > 0

  return (
    <div style={{ marginLeft: 10 }}>
      <Typography variant='subtitle2' sx={{ margin: '0px', color: isOverdue() ? 'red' : 'black' }}>
        {done ? 'Done' : renderDueText()}
      </Typography>
      <DatePicker 
        selected={new Date(date)} 
        onChange={(date) => handleChange(date)} 
      />
    </div>
  )
}
