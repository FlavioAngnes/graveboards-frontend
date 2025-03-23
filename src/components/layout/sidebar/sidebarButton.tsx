import React, {FC} from 'react';
import Button from "@/components/shared/button";

interface SidebarButtonProps {
    label?: string;
    onClick: () => void;
    icon?: React.ReactNode;
}

const SidebarButton: FC<SidebarButtonProps> = ({label, onClick, icon}) => {

    return (
        <Button onClick={onClick} variant="clear" className="w-full justify-start gap-2 rounded-lg px-3 py-2">
            {icon}
            <div>
                {label}
            </div>
        </Button>
    );
};

export default SidebarButton;
