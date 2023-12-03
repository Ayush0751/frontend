import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";

import ReadOnlyRow from "./ReadAccess";
import EditableRow from "./EditAccess";
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import "./Style.css";
import { MdDelete } from "react-icons/md";
const MainTable = () => {
  const [contacts, setContacts] = useState("");
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await fetchedData.json();
      setContacts(data);
      setpresentElement(data);
    };
    fetchData();
  }, []);

  const [editContactId, setEditContactId] = useState(null);

  //   const handleAddFormChange = (event) => {
  //     event.preventDefault();

  //     const fieldName = event.target.getAttribute("name");
  //     const fieldValue = event.target.value;

  //     const newFormData = { ...addFormData };
  //     newFormData[fieldName] = fieldValue;

  //     setAddFormData(newFormData);
  //   };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //   const handleAddFormSubmit = (event) => {
  //     event.preventDefault();

  //     const newContact = {
  //       id: nanoid(),
  //       name: addFormData.name,
  //       email: addFormData.email,
  //       role: addFormData.role,
  //     //   email: addFormData.email,
  //     };

  //     const newContacts = [...contacts, newContact];
  //     setContacts(newContacts);
  //   };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      email: editFormData.email,
      role: editFormData.role,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      email: contact.email,
      role: contact.role,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = presentElement.findIndex(
      (contact) => contact.id === contactId
    );

    newContacts.splice(index, 1);

    setContacts(newContacts);
    setpresentElement(newContacts);
  };

  // -----------------selection logic------------
  const [selectedRows, setSelectedRows] = useState([]);
  const toggleSelection = (contactId) => {
    const isSelected = selectedRows.includes(contactId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== contactId));
    } else {
      setSelectedRows([...selectedRows, contactId]);
    }
  };

  const toggleAllSelection = () => {
    const allSelected = selectedRows.length === contacts.length;
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allContactIds = contacts.map((contact) => contact.id);
      setSelectedRows(allContactIds);
    }
  };
  // const toggleAllSelection = () => {
  //     const allSelected = selectedRows.length === getData(current, size).length;

  //     if (allSelected) {
  //       // Deselect all rows on the current page
  //       setSelectedRows(selectedRows.filter((id) => !getData(current, size).map((contact) => contact.id).includes(id)));
  //     } else {
  //       // Select all rows on the current page
  //       const currentPageIds = getData(current, size).map((contact) => contact.id);
  //       setSelectedRows([...selectedRows, ...currentPageIds]);
  //     }
  //   };
  const [presentElement, setpresentElement] = useState();
  const handleDeleteSelected = () => {
    const newContacts = presentElement.filter(
      (contact) => !selectedRows.includes(contact.id)
    );
    setContacts(newContacts);
    setpresentElement(newContacts);
    setSelectedRows([]);
    setSearchQuery("");
  };

  //---------------------------------Pagination Logic starts--------------------------
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(contacts.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current, pageSize) => {
    return contacts.slice((current - 1) * pageSize, current * pageSize);
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <i className="fa fa-angle-double-left"></i>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <i className="fa fa-angle-double-right"></i>
        </button>
      );
    }
    return originalElement;
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredContacts = presentElement.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.role.toLowerCase().includes(query)
    );
    setContacts(filteredContacts);
  };

  useEffect(() => {
    const tables = document.querySelectorAll("table");

    if (tables) {
      tables.forEach((table) => {
        console.log(table);
        const headerRow = table.querySelector("thead tr");
        const thElements = headerRow.querySelectorAll("th");
        const tdElements = table.querySelectorAll("tbody tr td");

        let mainIndex = 0;
        tdElements.forEach((td) => {
          td.setAttribute("data-label", thElements[mainIndex].innerHTML);

          if (mainIndex === thElements.length - 1) {
            mainIndex = 0;
          } else {
            mainIndex += 1;
          }
        });
      });
    }
  }, [contacts]);

  return (
    <div className="app-container">
      <div className="nav">
        <div class="search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          {/* <button onClick={handleSearch} >Search</button> */}
        </div>
        <div className="delete-selected-btn">
          {selectedRows.length > 0 && (
            <button onClick={handleDeleteSelected} className="actionbtn">
              <MdDelete />
            </button>
          )}
        </div>
        <Pagination
          className="pagination-data"
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total}`
          }
          onChange={PaginationChange}
          total={contacts.length}
          current={current}
          pageSize={size}
          showSizeChanger={false}
          itemRender={PrevNextArrow}
          onShowSizeChange={PerPageChange}
        />
      </div>

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === contacts.length}
                  onChange={toggleAllSelection}
                  className="checkboxip"
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts &&
              getData(current, size).map((contact) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      isSelected={selectedRows.includes(contact.id)}
                      toggleSelection={toggleSelection}
                    />
                  )}
                </Fragment>
              ))}
          </tbody>
        </table>
        <div className="table-filter-info">
          <Pagination
            className="pagination-data"
            showTotal={(total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total}`
            }
            onChange={PaginationChange}
            total={contacts.length}
            current={current}
            pageSize={size}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
            onShowSizeChange={PerPageChange}
          />
        </div>
      </form>
    </div>
  );
};

export default MainTable;
