import { useState, useEffect } from 'react';
import LandingPage from '@/pages/LandingPage';
import AppPage from '@/pages/AppPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for navigation events
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Make navigate function available globally
  useEffect(() => {
    (window as any).navigateTo = (path: string) => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    };
  }, []);

  if (currentPath === '/app') return <AppPage />;
  return <LandingPage />;
}

export default App;
