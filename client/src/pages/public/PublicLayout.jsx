import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation, Topheader } from '~/components'

const PublicLayout = () => {
  return (
    <main>
      <Topheader />
      <Navigation />
      <div>
        <Outlet />
      </div>
  </main>
  )
}

export default PublicLayout