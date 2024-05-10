import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Page/home/home";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
