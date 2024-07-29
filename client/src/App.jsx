import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home,  PublicLayout } from './pages/public'
import path from "./utils/path"

const App = () => {
  return (<div className="" >
    <Routes>
      <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />} >
        <Route path={path.HOME} element={<Home />}/>
      </Route>
    </Routes>
  </div>
  )
}


export default App