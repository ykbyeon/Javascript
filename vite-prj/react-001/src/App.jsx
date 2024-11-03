import { useState } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css'
import Home from './views/home.jsx'
import Sample01 from './views/sample01.jsx'
import Sample02 from './views/sample02.jsx'
import About from './views/about.jsx'

const App = () => {

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount ( () => count + 1 );
  }
  const decrement = () => {
    setCount ( () => count - 1 );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home countValue={count} changeUp={increment} changeDown={decrement} />} />
          <Route path="sample01" element={<Sample01 countValue={count} changeUp={increment} changeDown={decrement} />} />   
          <Route path="sample02" element={<Sample02 countValue={count} changeUp={increment} changeDown={decrement} />} />             
          <Route path="about" element={<About countValue={count} changeUp={increment} changeDown={decrement} />} />          
        </Route>
      </Routes>

      <div>
      <button onClick={increment}>Increment</button> &nbsp; <button onClick={decrement}>Decrement</button>
      </div>
      <Home countValue={count} changeUp={increment} changeDown={decrement} />
      <Sample01 countValue={count}  changeUp={increment} changeDown={decrement} />
      <Sample02 countValue={count}  changeUp={increment} changeDown={decrement} />
      <About countValue={count} changeUp={increment} changeDown={decrement} />
    </>
  )
}

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to="/">Home</Link> &nbsp; 
          <Link to="sample01">Sample01</Link> &nbsp; 
          <Link to="sample02">Sample02</Link> &nbsp; 
          <Link to="about">About</Link>          
        </ul>
      </nav>
      <hr />
      <div className='displayArea'>
      <Outlet />
      </div>
    </div>
  );
};

export default App
