import Menu from "./Menu/index";
import Navbar from "./Navbar/index";
import {useState} from "react";

const MenuHeader = () => {
    const [isActive, setActive] = useState(false);
    const handleClick = () => {
        setActive(!isActive);
    }
    return (
        <>
            <Menu isActive={isActive}/>
            <Navbar onClickButton={handleClick}
                    isActive={isActive}/>
        </>
    );
}

export default MenuHeader;