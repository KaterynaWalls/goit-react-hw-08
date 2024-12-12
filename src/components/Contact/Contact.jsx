import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import s from "./Contact.module.css";
import { FaUser, FaPhone, FaTrashAlt, FaEdit } from "react-icons/fa";
import ReactModal from "react-modal";
import toast from "react-hot-toast";
import React from "react";

const Contact = React.memo(
  ({ id, name, number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
      dispatch(deleteContact(id));
      setIsModalOpen(false);
      toast.success(`Contact "${name}" deleted successfully!`, {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px 16px",
        },
      });
    };

    const handleEdit = () => {
      toast.info("Edit functionality coming soon!", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "#2563eb",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px 16px",
        },
      });
    };

    return (
      <li className={s.contactItem}>
        <div className={s.contactInfo}>
          <p className={s.contactName}>
            <FaUser className={s.icon} /> {name}
          </p>
          <p className={s.contactNumber}>
            <FaPhone className={s.icon} /> {number}
          </p>
        </div>
        <button className={s.editButton} onClick={handleEdit}>
          <FaEdit />
        </button>
        <button className={s.delButton} onClick={() => setIsModalOpen(true)}>
          <FaTrashAlt />
        </button>
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          className={s.modal}
           overlayClassName={s.overlay}
  contentLabel="Delete Confirmation Modal"
        >
          <p>Are you sure you want to delete this contact?</p>
          <button className={s.confirmButton} onClick={handleDelete}>
            Yes
          </button>
          <button
            className={s.cancelButton}
            onClick={() => {
              setIsModalOpen(false);
              toast.error("Delete action cancelled", {
                position: "top-right",
                duration: 3000,
                style: {
                  background: "#dc2626",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "8px 16px",
                },
              });
            }}
          >
            No
            
          </button>
        </ReactModal>
      </li>
    );
  },
  
    (prevProps, nextProps) => prevProps.id === nextProps.id && prevProps.name === nextProps.name && prevProps.number === nextProps.number

);

Contact.displayName = "Contact";

export default Contact;
