import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Fragment>
        <div>
            Hello World from React!
        </div>
        <div>
            <br/>
            <label>
                Region
                <input id='region' type='text' />
            </label>
            <button id='searchRegion'>
                Search
            </button>
            <br/>
            <div id='results'></div>
        </div>
    </Fragment>
);