export const checkedParticipantForm = (data) => {
  if (
    !data.CareerStage ||
    !data.Email ||
    !data.FirstName ||
    !data.LastName ||
    !data.OracleId ||
    !data.Phase ||
    !data.StartDate ||
    !data.EndDate ||
    !data.TrainingCode ||
    !data.TrainingName ||
    !data.Status
  ) {
    // if any field not present in list
    return false;
  } else {
    return true;
  }
};

export const checkedTrainingForm = (data, isEditMode) => {
  if (
    !data.trainingCode ||
    !data.trainingName ||
    !data.startDate ||
    !data.phase ||
    !data.type ||
    !data.endDate ||
    !data.status ||
    !data.PPC_OracleID ||
    !data.PPC_FirstName ||
    !data.PPC_LastName ||
    !data.PPC_Email ||
    !data.SPC_oracleID ||
    !data.SPC_FirstName ||
    !data.SPC_LastName ||
    !data.SPC_Email ||
    !data.oracleID ||
    !data.id
  ) {
    return false;
  } else {
    return true;
  }
};
