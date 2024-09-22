import { memo } from 'react'

const Separator = memo(() => {
    return (
        <div style={{ marginBottom: '2rem' }}></div>
    );
});

const _InputForm = (props) => {
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