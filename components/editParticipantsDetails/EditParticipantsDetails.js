import React from "react";
import ParticipantForm from "../common/forms/participantForm/ParticipantForm";
import { useSelector } from "react-redux";

const EditParticipantsDetails = ({ closeModal }) => {
  const { selectedParticipant } = useSelector((state) => state.participants);

  return (
    <section>
      <ParticipantForm isEditable={true} closeModal={closeModal} selected={selectedParticipant} />
    </section>
  );
};

export default EditParticipantsDetails;
