import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import "./Style.css";

const ReadAccess = ({
  contact,
  handleEditClick,
  handleDeleteClick,
  isSelected,
  toggleSelection,
}) => {
  return (
    <tr style={{ backgroundColor: isSelected ? "#ccc" : "inherit" }}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelection(contact.id)}
          className="checkboxip"
          value="cc"
          name="fer"
        />
      </td>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.role}</td>
      <td>
        <button
          className="actionbtn"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <CiEdit />
        </button>
        <button
          className="actionbtn"
          type="button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default ReadAccess;
