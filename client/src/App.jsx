import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  About,
  SignIn,
  Profile,
  SignUp,
  Property,
  Contact,
} from "./Pages/index";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path=" /property" element={<Property />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
