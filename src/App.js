import React from "react";
import './App.css';
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Header from "./components/Header";
import urlBg from "./assets/bg1.jpg";

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
                urlBg ={urlBg}
            />
            <Layout
                title = "This is new Title"
                descr= "This is new description!"
                colorBg = 'red'
            />
            <Footer/>
        </>
    );
}

export default App;
