import { FC, memo, ReactNode } from 'react'

const Separator = memo(() => {
    return (
        <div style={{ marginBottom: '2rem' }}></div>
    );
});

interface IInputFormProps {
    addSeparatorAfterButton: boolean;
    afterButton: ReactNode;
    afterChildren: ReactNode;
    beforeChildren: ReactNode;
    buttonLabel: string;
    children: ReactNode;
    formStyles: string;
    onSubmit: () => void;
    buttonStyles?: string;
}

const _InputForm: FC<IInputFormProps> = (props) => {
    const {
        afterButton,
        afterChildren,
        beforeChildren,
        buttonLabel,
        buttonStyles,
        children,
        formStyles,
        addSeparatorAfterButton,
        onSubmit,
    } = props;

    return (
        <form
            className={formStyles}
            onSubmit={onSubmit}
        >
            {beforeChildren}

            {children}

            {afterChildren}

            <button>{buttonLabel}</button>

            {addSeparatorAfterButton ? <Separator /> : null}

            {afterButton}
        </form>
    )
}

export default memo(_InputForm);