import { Rotas } from './routes/Rotas'
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
      <AuthProvider>
          <Rotas />
      </AuthProvider>
  );
}

export default App;
