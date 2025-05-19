import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <div>
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="contact" element={<Creadentials />} /> */}
          {/* <Route path="*" element={<Creadentials />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App