import React, { useState } from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
    active: boolean;
    setActive: any;
    children: any;
}

const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>

                {children}
            </div>
        </div>
    );
};

export default Modal;