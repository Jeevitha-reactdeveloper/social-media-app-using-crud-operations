import About from './pages/About';
import Footer from './Common/Footer';
import Header from './Common/Header';
import Home from './pages/Home';
import Missing from './Common/Missing';
import NewPost from './pages/NewPost';
import PostPage from './pages/PostPage';
import Nav from './Common/Nav';
import {Routes, Route } from 'react-router-dom';
import Editpost from './pages/Editpost';
import { DataProvider } from './contextapi/DataContext';


function App() {
  
return (
    <div className="App">
      <DataProvider>
        <Header title="Social Media App" />
        <Nav/>
        <Routes>
          <Route path='/'  element ={ <Home/>}/>
          <Route path='/post'> 
              <Route index element={<NewPost />}/>
              <Route path=':id'  element={<PostPage/>}/>
          </Route>
            <Route path='/edit/:id' element={<Editpost />}/>
            <Route path='/about'  element={<About/>}/>
            <Route path='*' element={<Missing/>}/>
        </Routes>
        <Footer/> 
      </DataProvider>
    </div>
  );
}

export default App;
