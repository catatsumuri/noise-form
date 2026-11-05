import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from '../resources/js/pages/welcome';
import '../resources/css/app.css';

// This is the REAL original Laravel welcome.tsx, not a duplicated mock page.
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Welcome />
    </StrictMode>,
);
