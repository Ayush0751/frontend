import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./Style.css";
import { TiTick } from "react-icons/ti";

const EditAccess = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input 
            type="checkbox" 
            className="checkboxip" 
            // required="required"
            // placeholder="Enter a name..."
            name="box"
            value="box"
        />
      </td>

      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a role..."
          name="role"
          value={editFormData.role}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit" className="actionbtn">
          <TiTick />
        </button>
        <button type="button" onClick={handleCancelClick} className="actionbtn">
          <RxCross2 />
        </button>
      </td>
    </tr>
  );
};

export default EditAccess;
