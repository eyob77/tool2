import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/designer/Navbar'
import Editor from './components/canvas/editor'
import Preview from './components/canvas/preview'

function App() {

  return (
    <main className='w-screen h-screen'>
      <Navbar />
      <Routes>
        <Route path='/design' element={<Editor/>} />
        <Route path='/preview' element={<Preview/>} />
      </Routes>
    </main>
  )
}

export default App
