import React from "react";
import { useSelector } from "react-redux";
import TrainingForm from "../common/forms/trainingForm/TrainingForm";

export default function UpdateTraining({closeModal}) {
  const { selectedTraining } = useSelector((state) => state.trainings);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-group col-md-10 col-md-offset-5 align-center">
          <TrainingForm
            isEditMode={true}
            isEditable={true}
            closeModal={closeModal}
            selected={selectedTraining}
          />
        </div>
      </div>
    </div>
  );
}
