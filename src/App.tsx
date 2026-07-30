import LandingPage from '@/pages/LandingPage';
import AppPage from '@/pages/AppPage';

function App() {
  const path = window.location.pathname;
  if (path === '/app') return <AppPage />;
  return <LandingPage />;
}

export default App;
