import { useParams } from "react-router-dom";

function BookPage() {
    const { book } = useParams();
    return (
        <div>
            <h1>{ book }</h1>
        </div>
    )
}


export default BookPage