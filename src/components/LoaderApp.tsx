import { useEffect } from 'react';

export const LoaderApp: React.FC = () => {
  useEffect(() => {
    const loader = document.getElementById('loaderApp');

    // Show loading
    // loader?.classList.remove('hidden');

    if(loader) loader.hidden = false;
    
    return () => { // Hide loading
      // loader?.classList.add('hidden');

      if(loader) loader.hidden = true;
    }
  }, []);

  return null;
}
