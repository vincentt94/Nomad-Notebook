import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import MyStories from "./pages/MyStories.tsx";
import CreateStory from "./pages/CreateStory.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mystories" element={<MyStories />} /> 
        <Route path="/createstory" element={<CreateStory />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
