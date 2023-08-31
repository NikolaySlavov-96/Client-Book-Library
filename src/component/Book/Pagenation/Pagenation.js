export const Pagenation = ({ books }) => {

    const page = Math.ceil(books / 10) || 0;
    return (
        <div>
            <p>{page}</p>
        </div>
    );
}