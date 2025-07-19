import Claim from '../components/Claim';
import Add from '../components/Add';
import './App.css';
import Leaderboard from '../components/Leaderboard';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    // Global context provider for managing user state across components
    <UserProvider>
      <div className='md:flex flex-row'>
        <div>
          {/* Claim random points for a user */}
          <Claim />
          {/* Add a new user */}
          <Add />
        </div>

        {/* Display top 10 users based on points */}
        <Leaderboard />
      </div>
    </UserProvider>
  );
}

export default App;
