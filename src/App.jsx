import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';

import Home from './pages/Home';
import './App.css'
import Contact from './pages/Contact';



function App() {
  return (
    <BrowserRouter>
      <Header
        brand="Geração Tech"
        description="Sede Bezerra">

        <a href="/#equipe">Equipe</a>
        <NavLink to={'/contato'}>Contato</NavLink>

      </Header>
      
      <main className='container'>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path = '*' element = {<Home/>}/>
          <Route path = '/' element = {<Contact/>}/>          
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App
