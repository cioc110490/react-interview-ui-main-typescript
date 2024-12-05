import Stack from '@mui/material/Stack'
import React from 'react'
import './App.css'

import CreateWidget from './components/CreateWidget/CreateWidget'
import DeleteWidget from './components/DeleteWidget/DeleteWidget'
import FindWidget from './components/FindWidget/FindWidget'
import SideBar from './components/SideBar/SideBar'
import UpdateWidget from './components/UpdateWidget/UpdateWidget'
import WidgetList from './components/WidgetList'

const App = (): JSX.Element => {
  const [page, setPage] = React.useState('List');

  return (
    <>
      <SideBar selected={page} setSelected={setPage} />

      {page === 'List' && <Stack><WidgetList /></Stack>}
      {page === 'Create' && <CreateWidget />}
      {page === 'Update' && <UpdateWidget />}
      {page === 'Find' && <FindWidget />}
      {page === 'Delete' && <DeleteWidget />}
    </>
  )
}

export default App
