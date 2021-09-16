import {useState} from 'react';
import HomePage from "./routes/Home/index";
import GamePage from "./routes/Game/index";

const App = () => {
    const [page, setPage] = useState('app');
    const handleChangePage = (page) => {
            setPage(page);
    }

    switch (page) {
        case "app":
            return <HomePage onChangePage = {handleChangePage} />
        case "game":
            return <GamePage />
        default:
            return <HomePage />
    }
};

export default App;
