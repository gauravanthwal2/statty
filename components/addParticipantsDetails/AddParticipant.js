import React from "react";
import ParticipantForm from "../common/forms/participantForm/ParticipantForm";

export default function AddParticipant({closeModal}) {
  return (
    <section>
      <ParticipantForm closeModal={closeModal}/>
    </section>
  );
}
