import { useEffect, useRef, useState } from "react";

import style from './CustomSelect.module.css';


// Icon component
const Icon = ({ isOpen }) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? style['translate'] : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

// CustomSelect component
export const CustomSelect = ({ placeHolder, options, onChange, align }) => {
    // State variables using React hooks
    const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
    const [selectedValue, setSelectedValue] = useState([]); // Stores the selected value(s)
    const inputRef = useRef(); // Reference to the custom select input element

    useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        return selectedValue.label;
    };

    const onItemClick = (option) => {
        setSelectedValue(option);
        onChange(option);
    };

    const getOptions = () => {
        return options.filter(
            (option) =>
                option.label.toLowerCase()
        );
    };

    return (
        <div className={style["custom__dropdown-container"]}>

            <div ref={inputRef} onClick={handleInputClick} className={style["dropdown__input"]}>
                <div className={`${style['dropdown__selected-value']} ${!selectedValue || selectedValue.length === 0 ? 'placeholder' : ''}`}>{getDisplay()}</div>
                <div className={style['dropdown__tools']}>
                    <div className={style['dropdown__tool']}>
                        <Icon isOpen={showMenu} />
                    </div>
                </div>
            </div>

            {
                showMenu && (
                    <div className={`${style[`dropdown__menu`]} ${style[`alignment__${align || 'auto'}`]}`}>
                        {
                            getOptions().map((option) => (
                                <div onClick={() => onItemClick(option)} key={option.value} className={style[`dropdown__item`]} >
                                    {option.label}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}