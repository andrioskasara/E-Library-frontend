import React from "react";
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author.name} {props.term.author.surname}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <Link to={`/books/delete/${props.term.id}`}
                      className={"btn btn-danger m-2"}
                      onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </Link>
                <Link to={`/books/edit/${props.term.id}`}
                      onClick={() => props.onEdit(props.term.id)}
                      className={"btn btn-info m-2"}>
                    Edit
                </Link>
                <Link to={`/books/markAsTaken/${props.term.id}`}
                      onClick={() => props.onMark(props.term.id)}
                      className={"btn btn-secondary"}>
                    Mark As Taken
                </Link>
            </td>
        </tr>
    )
}


export default bookTerm;