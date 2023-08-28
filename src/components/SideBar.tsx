import React, { useEffect, useRef, useState } from "react";
import "./style.css";

interface SidebarProps {
    width?: number;
    children: React.ReactNode;
}

const SideBar: React.FC<SidebarProps> = ({ width = 280, children }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState<number>(-width);
    const side = useRef<HTMLDivElement>(null);

    // Toggle sidebar
    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(-width);
            setOpen(false);
        }
    };

    // Handle outside click to close sidebar
    const handleOutsideClick = (e: MouseEvent) => {
        if (side.current && !side.current.contains(e.target as Node)) {
            setOpen(false);
            setX(-width);
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("click", handleOutsideClick);
        } else {
            window.removeEventListener("click", handleOutsideClick);
        }
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="container">
            <div
                ref={side}
                className="sidebar"
                style={{
                    width: `${width}px`,
                    height: "100%",
                    transform: `translatex(${-xPosition}px)`,
                }}
            >
                <button onClick={toggleMenu} className="button">
                    {isOpen ? <span>X</span> : <img src="images/avatar.png" alt="contact open button" className="openBtn" />}
                </button>
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default SideBar;
