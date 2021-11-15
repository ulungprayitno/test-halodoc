import React, { lazy, Suspense } from 'react';
import Navbar from '../components/navbar'
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./home'));
const Detail = lazy(() => import('./detail'));

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Suspense fallback="">
            <Route path='/' component={Home} exact></Route>
            <Route path='/detail/:id' component={Detail} exact></Route>
        </Suspense>
    </Routes>
    </>
  );
}

export default App;