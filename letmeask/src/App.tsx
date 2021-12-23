import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
//import { Room } from './pages/Room';
//import { AdminRoom } from './pages/AdminRoom';

//import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
          <Route index element={Home} />
          <Route path="/rooms/new" element={NewRoom} />
    </BrowserRouter>
  );
}

export default App;
