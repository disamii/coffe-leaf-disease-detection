import React from 'react'
import HeaderAuth from '../UI/HeaderAuth'
import { Outlet } from 'react-router-dom'

export default function Page() {
  return (
    <>
    <HeaderAuth/>
    <Outlet/>
    </>
  )
}
