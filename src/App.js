import React from "react";
import './App.css';
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Header from "./components/Header";
import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";

const App = () => {
    return (
        <>
            <Header
                title = "This is new Title"
                descr= "This is new description!"
            />
            <Layout
                title = "This is new Title"
                descr= "This is new description!"
                urlBg ={bg1}
            />
            <Layout
                title = "This is new Title"
                descr= "This is new description!"
                colorBg = 'red'
            />
            <Layout
                title = "This is new Title"
                descr= "This is new description!"
                urlBg ={bg2}
            />
            <Footer/>
        </>
    );
}

export default App;
