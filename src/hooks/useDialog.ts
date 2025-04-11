import { useCallback, useRef } from "react";

const useDialog = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const onOpen = () => ref.current?.showModal();
    const onClose = useCallback(() => ref.current?.close(), []);

    return {ref, onOpen, onClose};
};

export default useDialog;
