import React from 'react';
import ReactDOM from 'react-dom/client';
import Theme from "./theme";
import Router from "./router";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Theme>
           <Router />
        </Theme>
    </React.StrictMode>
);

