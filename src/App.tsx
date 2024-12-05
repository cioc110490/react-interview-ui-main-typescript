import React from 'react'
import './App.css'
import Stack from '@mui/material/Stack'

import WidgetList from './components/WidgetList'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import SideBar from './components/SideBar/SideBar'
import CreateWidget from './components/CreateWidget/CreateWidget'

const App = (): JSX.Element => {
  const [page, setPage] = React.useState('create');

  return (
    <>
      <SideBar selected={page} setSelected={setPage} />

      {page === 'list' && <Stack><WidgetList /></Stack>}
      {page === 'create' && <CreateWidget />}
    </>
  )
}

/*

*/

export default App
