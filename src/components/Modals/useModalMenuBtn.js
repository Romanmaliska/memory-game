import { useState } from "react";

const useModalMenuBtn = () => {
    const [isShowingMenuModal, setIsShowingMenuModal] = useState(false);

    const toggleMenuModal = () => {
        setIsShowingMenuModal(!isShowingMenuModal);
        
    };

    return { isShowingMenuModal, toggleMenuModal };
};

export default useModalMenuBtn;
