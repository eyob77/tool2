import { Route, Routes } from 'react-router-dom'
import './App.css'
import Editor from './components/canvas/editor'
import Preview from './components/canvas/preview'
import Canvas from './components/canvas/canvas'
import DesignerLayout from './layout'

function App() {

  return (
    <main className='w-screen h-screen overflow-hidden'>
      <Routes>
        <Route path='/design' element={
          <DesignerLayout>
            <Editor/>
          </DesignerLayout>
        } />
        <Route path='/preview' element={
          <DesignerLayout>
            <Preview/>
          </DesignerLayout>
        } />
        <Route path='/canvas' element={<Canvas/>} />
      </Routes>
    </main>
  )
}

export default App
