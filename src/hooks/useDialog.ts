import {useRef} from 'react';

const useDialog = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const onOpen = () => ref.current?.showModal();
    const onClose = () => ref.current?.close();

    return {ref, onOpen, onClose};
};

export default useDialog;
