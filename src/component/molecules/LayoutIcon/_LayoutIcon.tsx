import { FC, memo, } from "react";

import style from './_LayoutIcon.module.css';
import { TViewType } from "~/Types/Components";

const getColor = (status: boolean) => {
    return status ? 'red023e8a' : '#e3e3e3'
}

interface IIconProps {
    isSelected: boolean;
}

const Grid: FC<IIconProps> = ({ isSelected }) => {
    const color = getColor(isSelected);

    return (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" /></svg>)
}

const List: FC<IIconProps> = ({ isSelected }) => {
    const color = getColor(isSelected);

    return (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>)
}

interface ISelectProps {
    typeView: TViewType;
    onChange: (option: TViewType) => void;
}

const _LayoutIcon: FC<ISelectProps> = (props) => {
    const { typeView, onChange, } = props;

    return (
        <div className={`${style["container"]}`}>
            <button onClick={() => onChange('list')}>
                <List isSelected={typeView === 'list'} />
            </button>
            <button onClick={() => onChange('grid')}>
                <Grid isSelected={typeView === 'grid'} />
            </button>
        </div>
    );
}

export default memo(_LayoutIcon);