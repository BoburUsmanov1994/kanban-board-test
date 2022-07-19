import React from 'react';
import ReactDOM from 'react-dom/client';
import Theme from "./theme";
import Router from "./router";
import Query from "./services/query";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Query>
            <Theme>
                <Router/>
            </Theme>
        </Query>
    // </React.StrictMode>
);

