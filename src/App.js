
import './App.css';
import {Routes,BrowserRouter,Route} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import AddEditBlog from './pages/AddEditBlog';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

import NotFound from './pages/NotFound';
function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Header />
      <ToastContainer />
    <Routes>

      <Route path="/" element={<Home />}/>
      <Route path="/blog/:id" element={<Blog />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/add" element={<AddEditBlog />}/>
      <Route path="/edit/:id" element={<AddEditBlog />}/>
      <Route path="/notFound" element={<NotFound />}/>


    </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
