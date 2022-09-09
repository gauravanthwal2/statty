import React from "react";
import TrainingForm from "../common/forms/trainingForm/TrainingForm";

export default function AddTraining({closeModal}) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-group col-md-10 col-md-offset-5 align-center">
          <TrainingForm
            isEditMode={false}
            isEditable={true}
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
}
