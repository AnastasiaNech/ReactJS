import {useState} from "react";
import Menu from "./Menu/index";
import Navbar from "./Navbar/index";


const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] = useState(null);
    const handleClickHamburg = () => {
        setActive(isActive => !isActive);
    }
    return (
        <>
            <Menu isActive={isActive}/>
            <Navbar isActive={isActive}
                    bgActive={bgActive}
                    onClickHamburg={handleClickHamburg}/>
        </>
    );
}

export default MenuHeader;