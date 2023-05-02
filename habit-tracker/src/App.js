import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import RegistrationPage from './Pages/RegistrationPage';
import NewHabitPage from "./Pages/NewHabitPage";
import EditHabitPage from "./Pages/EditHabitPage";
import HabitDetailsPage from './Pages/HabitDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/new-habit" element={<ProtectedRoute><NewHabitPage /></ProtectedRoute>} />
          <Route path="/edit/:habitId" element={<ProtectedRoute><EditHabitPage /></ProtectedRoute>} />
          <Route path="/habit/:habitId" element={<ProtectedRoute><HabitDetailsPage /></ProtectedRoute>} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
