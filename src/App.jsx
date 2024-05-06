import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/Sidebar/SideBar'
import { Route, Routes, useAsyncError } from 'react-router-dom'
import Home from './Page/Home/Home'
import Video from './Page/Video/Video'

const App = () => {

  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home  sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
    </>
  )
}

export default App