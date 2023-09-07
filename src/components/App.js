import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getPosts } from '../api';
import { Home, Login, Signup } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>User</h1>;
};

const Page404 = () => {
  return <h1>404</h1>;
};

//function App() {
 
  function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const auth = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
     
      <ToastContainer />
      <Router>
      <Navbar />
        <Routes>
        <Route  path="/" element={<Home posts={posts}/>} />
        <Route  path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route  path="/about" element={<About/>} />
        <Route path="/user/asdasd" element={<UserInfo/>} />

    
        {/*<Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/user/asdasd">
          <UserInfo />
        </Route>

        <Route>
          <Page404 />
  </Route>*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
