import Header from './components/Header';
import Dashboard from  './views/Dashboard';
import Benefits from './views/Benefits';
import EmployeeForm  from './components/EmployeeForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex min-h-screen bg-custom-bg-pink">
      <Router>
        <Header />

        <div className="flex-grow p-4 mx-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/created" element={<Benefits />} />
            <Route path="/edit-employee/:id" element={<EmployeeForm />} />
          </Routes>
        </div>

    </Router>
    </div>
  );
};

export default App;
