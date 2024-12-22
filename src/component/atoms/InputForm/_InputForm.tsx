import { CSSProperties, FC, FormEvent, memo, ReactNode } from 'react'

const Separator = memo(() => {
    return (
        <div style={{ marginBottom: '2rem' }}></div>
    );
});

interface IInputFormProps {
    buttonLabel: string;
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    addSeparatorAfterButton?: boolean;
    afterButton?: ReactNode;
    afterChildren?: ReactNode;
    beforeChildren?: ReactNode;
    // buttonStyles?: CSSProperties;
    buttonStyles?: string;
    formStyles?: string;
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

    const onPress = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
    }

    return (
        <form
            className={formStyles}
            onSubmit={onPress}
        >
            {beforeChildren}

            {children}

            {afterChildren}

            <button>{buttonLabel}</button>
            {/* <button style={buttonStyles}>{buttonLabel}</button> */}

            {addSeparatorAfterButton ? <Separator /> : null}

            {afterButton}
        </form>
    )
}

export default memo(_InputForm);