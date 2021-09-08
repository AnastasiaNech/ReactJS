import React from 'react';
import ReactDOM from 'react-dom';

// const el = React.createElement(
//     'h1',
//     null,
//     'Hello World,ReactJS!'
// )
const AppHeader = () => {
    return (
        <h1 className="App-header">Hello World,ReactJS!</h1>
    );
}

const AppInput = () => {
    const placeholder = "Type text...."
    return (
        <lable htmlfor="search">
            <input
                id="search"
                placeholder ={placeholder}
            />
        </lable>
    );
}

const AppList = () => {
    const items = ['Items 1','Items 2', 'Items 3'];
    const firstItem = <li>Items 0</li>;
    return (
        <ul>
        {
            firstItem
        }
        {
        items.map(item => <li>{items}</li>)
        }
            <li>{items[0]}</li>
            <li>{items[1]}</li>
        </ul>
    );
}

const App = () => {
    return (
    <>
        <AppInput/>
        <AppHeader/>
        <AppList/>
    </>
);
}

ReactDOM.render(<App/>, document.getElementById('root'))

