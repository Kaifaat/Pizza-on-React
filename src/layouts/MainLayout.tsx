import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Modal from "../components/Modal";

const MainLayout: React.FC = () => {
    const [modalActive, setModalActive] = React.useState(false);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                {/*<p>15151515</p>*/}
            </Modal>
        </div>
    );
};

export default MainLayout;