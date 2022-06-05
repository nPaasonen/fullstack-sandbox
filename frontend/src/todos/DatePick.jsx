import React, { useState } from 'react'
import { Typography } from '@mui/material'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePick = ({ todo, setTodos }) => {
  const renderDue = (date) => 'Due ' + moment(date).fromNow()

  const isOverdue = (todo) => !todo.done && moment().diff(moment(todo.date)) > 0

  return (
    <div style={{marginLeft: 10}}>
      <Typography variant='subtitle2' sx={{ margin: '0px', color: isOverdue(todo) ? 'red' : 'black' }}>
        {todo.done ? "Done" : renderDue(todo.date)}
      </Typography>
      <DatePicker selected={new Date(todo.date)} onChange={(date) => setTodos(date)} />
    </div>
  )
}
