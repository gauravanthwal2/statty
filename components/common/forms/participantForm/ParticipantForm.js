import uuid from "react-uuid";
import { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./ParticipantForm.module.css";
import PrimaryButton from "../../buttons/primaryButton/PrimaryButton";
import SecondaryButton from "../../buttons/secondaryButton/SecondaryButton";
import {
  participantInformation,
  AddParticipantHeader,
  UpdateParticipantHeader,
  participantsFormFields,
} from "../../../../utils/constants/participantPageConstants";
import { trainingInformation } from "../../../../utils/constants/trainingPageConstants";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewParticipant,
  updateParticipantsData,
} from "../../../../redux/addParticipants/addParticipantSlice";
import { getAllUsers } from "../../../../services/usersServices";
import { getAllTrainings } from "../../../../services/trainingServices";
import { checkedParticipantForm } from "../../../../utils/checkFormFields/checkFormFields";
import Head from "next/head";

const {
  participantSubHeading,
  oracleID,
  firstName,
  lastName,
  email,
  careerStage,
} = participantInformation;

const {
  trainingInformationHeading,
  trainingCodeLabel,
  trainingNameLabel,
  startDateLabel,
  endDateLabel,
  typeLabel,
  phaseLabel,
  statusLabel,
} = trainingInformation;

export default function ParticipantForm({ isEditable, closeModal, selected }) {
  const [usersData, setUsersData] = useState([]);
  const [trainingsData, setTrainingsData] = useState([]);

  // Getting TypeHead Values
  useEffect(() => {
    (async () => {
      const res = await getAllUsers();
      setUsersData(res);
    })();
    (async () => {
      const res = await getAllTrainings();
      setTrainingsData(res);
    })();
  }, []);

  // Setting Users TypeHead Values
  const userSelectData = usersData.map((item) => {
    const name = item.OracleId;
    return {
      value: name,
      label: name,
    };
  });

  //Setting Trainings TypeHead Values
  const trainingSelectData = trainingsData.map((item) => {
    const code = item.trainingCode + " (" + item.trainingName + " )";
    return {
      value: code,
      label: code,
    };
  });

  const dispatch = useDispatch();

  // Forms State
  const [usersOracleId, setUsersOracleId] = useState(null);
  const [selectedTrainingCode, setTrainingCode] = useState(null);

  const [form, setForm] = useState(participantsFormFields);
  const {
    FirstName,
    LastName,
    Email,
    CareerStage,
    TrainingName,
    StartDate,
    EndDate,
    Phase,
    Status,
  } = form;

  // On Input Change
  const onHandleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setUsersDetailsByOracleId = (e) => {
    setUsersOracleId(e.value);
    const selectedUser = usersData.filter(
      (item) => item.OracleId == e.value
    )[0];
    setForm((prev) => ({
      ...form,
      FirstName: selectedUser?.FirstName,
      LastName: selectedUser?.LastName,
      Email: selectedUser?.Email,
      CareerStage: selectedUser?.CareerStage,
    }));
  };

  const setTrainingById = (e) => {
    setTrainingCode(e.value);
    const selectedTraining = trainingsData?.filter(
      (item) => item.trainingCode == e.value.split(" ")[0]
    )[0];
    setForm((prev) => ({
      ...form,
      StartDate: selectedTraining?.startDate,
      EndDate: selectedTraining?.endDate,
      TrainingName: selectedTraining?.trainingName,
      Status: selectedTraining?.status,
    }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      OracleId: usersOracleId,
      trainingCode: selectedTrainingCode.split(" ")[0],
      id: uuid(),
    };

    dispatch(addNewParticipant(data));
    // if (checkedParticipantForm(data)) {
    // } else {
    //   alert("All Fields Are Required!");
    // }
    clearModal();
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      OracleId: usersOracleId || selected?.OracleId,
      trainingCode: selectedTrainingCode || selected?.trainingCode,
    };

    dispatch(updateParticipantsData({ id: selected.id, data }));
    // if (checkedParticipantForm(data)) {
    // } else {
    //   alert("All Fields Are Required!");
    // }
    clearModal();
  };

  // Clearing Modal
  const clearModal = () => {
    setForm(participantsFormFields);
    closeModal();
  };

  // Setting Pre Populated Values in the Inputbox
  useEffect(() => {
    if (isEditable && selected) {
      setForm({
        FirstName: selected?.FirstName,
        LastName: selected?.LastName,
        Email: selected?.Email,
        CareerStage: selected?.CareerStage,
        // TrainingName: selected?.TrainingName,
        // StartDate: selected?.StartDate,
        // EndDate: selected?.EndDate,
        // Phase: selected?.Phase,
        // Status: selected?.Status,
      });
    }
  }, [selected, isEditable]);

  return (
    <div className={styles.partForm}>
      <Head>
        <title>Participants</title>
      </Head>
      <h4 className="text-secondary text-center fw-semibold mb-3">
        {isEditable ? UpdateParticipantHeader : AddParticipantHeader}
      </h4>
      <form onSubmit={isEditable ? handleUpdate : handleSubmit}>
        <div className={styles.addParticipant}>
          <div className="">
            <p className="text-secondary fw-bold">{participantSubHeading}</p>
            <div className="mt-1 mb-3">
              {isEditable ? (
                <>
                  <label htmlFor="oracleID">
                    {oracleID} <span className={styles.required}>*</span>
                  </label>
                  <input
                    value={selected?.OracleId}
                    type="text"
                    id="oracleID"
                    name="oracleID"
                    className="form-control"
                    aria-label="oracleID"
                    required={true}
                    readOnly={true}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="oracleID">
                    {oracleID} <span className={styles.required}>*</span>
                  </label>
                  <Select
                    onChange={setUsersDetailsByOracleId}
                    options={userSelectData}
                    id="oracleID"
                    name="oracleID"
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: "5px",
                      colors: {
                        ...theme.colors,
                      },
                    })}
                    required={true}
                  />
                </>
              )}
            </div>
            <div className="my-3">
              <label htmlFor="FirstName">
                {firstName} <span className={styles.required}>*</span>
              </label>
              <input
                value={FirstName}
                onChange={onHandleChange}
                type="text"
                id="FirstName"
                name="FirstName"
                className="form-control"
                aria-label="firstName"
                required={true}
                readOnly={isEditable}
              />
            </div>
            <div className="my-3">
              <label htmlFor="LastName">
                {lastName} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={LastName}
                onChange={onHandleChange}
                id="LastName"
                name="LastName"
                className="form-control"
                aria-label="lastName"
                required={true}
                readOnly={isEditable}
              />
            </div>
            <div className="my-3">
              <label htmlFor="Email">
                {email} <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                value={Email}
                onChange={onHandleChange}
                id="Email"
                name="Email"
                className="form-control "
                aria-label="Email"
                required={true}
                readOnly={isEditable}
              />
              <span className={styles.emailExample}>
                Example: smigel@publicissapient.com
              </span>
            </div>
            <div className="mt-3">
              <label htmlFor="careerStage">
                {careerStage} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={CareerStage}
                onChange={onHandleChange}
                id="careerStage"
                name="careerStage"
                className="form-control "
                aria-label="careerStage"
                required={true}
                readOnly={isEditable}
              />
            </div>
          </div>
          <div className="">
            <p className="text-secondary fw-bold">
              {trainingInformationHeading}
            </p>
            <div className="mt-1 mb-3">
              {isEditable ? (
                <>
                  <label htmlFor="TrainingCode">
                    {trainingCodeLabel}{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  <Select
                    onChange={setTrainingById}
                    options={trainingSelectData}
                    id="TrainingCode"
                    name="TrainingCode"
                    required={true}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="TrainingCode">
                    {trainingCodeLabel}{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  <Select
                    onChange={setTrainingById}
                    options={trainingSelectData}
                    id="TrainingCode"
                    name="TrainingCode"
                    required={true}
                  />
                </>
              )}
            </div>
            <div className="my-3">
              <label htmlFor="TrainingName">
                {trainingNameLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={TrainingName}
                onChange={onHandleChange}
                id="TrainingName"
                name="TrainingName"
                className="form-control "
                aria-label="trainingName"
                required={true}
                readOnly={isEditable}
              />
            </div>
            <div className="my-3">
              <label htmlFor="StartDate">
                {startDateLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={StartDate}
                onChange={onHandleChange}
                id="StartDate"
                name="StartDate"
                className="form-control "
                aria-label="StartDate"
                required={true}
                // readOnly={isEditable}
              />
            </div>
            <div className="my-3">
              <label htmlFor="EndDate">
                {endDateLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={EndDate}
                onChange={onHandleChange}
                id="EndDate"
                name="EndDate"
                className="form-control"
                aria-label="endDate"
                required={true}
                // readOnly={isEditable}
              />
            </div>
            <div className="my-3">
              <label htmlFor="phase">
                {phaseLabel} <span className={styles.required}>*</span>
              </label>
              <select
                id="phase"
                data-testid="select-participant"
                className="form-control "
                required={true}
                readOnly={isEditable}
                onChange={(e) => setForm({ ...form, Phase: e.target.value })}
              >
                {[
                  "Upcoming",
                  "Sessions in progress",
                  "Capstone Phase",
                  "Assessment Phase",
                  "Finished",
                ].map((item, index) => (
                  <option
                    value={item}
                    key={item}
                    data-testid="select-option-participant"
                    defaultValue={index === 1}
                    defaultChecked={index === 1}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 mb-4">
              <label htmlFor="Status">
                {statusLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={Status}
                onChange={onHandleChange}
                id="Status"
                name="Status"
                className="form-control "
                aria-label="status"
                required={true}
                readOnly={isEditable}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {isEditable ? (
            <PrimaryButton
              text={"Update Participant"}
              type="submit"
              data-testid="update"
            />
          ) : (
            <SecondaryButton
              text={"Add Participant"}
              type="submit"
              data-testid="add"
            />
          )}
        </div>
      </form>
    </div>
  );
}
