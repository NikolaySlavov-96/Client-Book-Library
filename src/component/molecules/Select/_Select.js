import { memo, useCallback, useEffect, useRef, useState } from "react";

import style from './_Select.module.css';


const Icon = memo(({ isOpen }) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? style['translate'] : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
});

const _Select = ({ placeHolder, options, onChange, align, size }) => {
    const inputRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);

    const handler = useCallback((e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    }, [inputRef, setShowMenu]);

    const handleInputClick = useCallback((e) => {
        setShowMenu(!showMenu);
    }, [setShowMenu, showMenu]);

    const getDisplay = useCallback(() => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        return selectedValue.label;
    }, [selectedValue, placeHolder]);

    const onItemClick = useCallback((option) => {
        setSelectedValue(option);
        onChange(option);
    }, [setSelectedValue, onChange]);

    const getOptions = useCallback(() => {
        return options.filter(
            (option) =>
                option.label.toLowerCase()
        );
    }, [options]);

    useEffect(() => {
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    }, [handler]);

    return (
        <div className={`${style["dropdown-container"]} ${size && style['custom__size_' + size]}`}>

            <div ref={inputRef} onClick={handleInputClick} className={style["dropdown__input"]}>
                <div className={`${!selectedValue || selectedValue.length === 0 ? style['placeholder'] : ''}`}>{getDisplay()}</div>
                <div className={style['dropdown__tools']}>
                    <div className={style['dropdown__tool']}>
                        <Icon isOpen={showMenu} />
                    </div>
                </div>
            </div>

            {
                showMenu && (
                    <div className={`${size && style['custom__size_' + size]} ${style[`dropdown__menu`]} ${style[`alignment__${align || 'auto'}`]}`}>
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

export default memo(_Select);