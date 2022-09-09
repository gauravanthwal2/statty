import uuid from "react-uuid";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import PrimaryButton from "../../buttons/primaryButton/PrimaryButton";
import {
  AddTrainingButtonText,
  UpdateTrainingButtonText,
  AddTrainingHeader,
  UpdateTrainingHeader,
  trainingInformation,
  PrimaryPOCInformation,
  SecondaryPOCInformation,
  Mentors,
  additionalDocs,
  trainingPageFormFields,
} from "../../../../utils/constants/trainingPageConstants";
import styles from "./TrainingForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../services/usersServices";
import {
  addNewTraining,
  updateTrainingData,
} from "../../../../redux/addTrainings/addTrainingSlice";
import SecondaryButton from "../../buttons/secondaryButton/SecondaryButton";
import Head from "next/head";

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

const {
  PPC_InformationHeading,
  PPC_OracleIDLabel,
  PPC_FirstNameLabel,
  PPC_LastNameLabel,
  PPC_EmailLabel,
} = PrimaryPOCInformation;

const {
  SPC_InformationHeading,
  SPC_oracleIDLabel,
  SPC_FirstNameLabel,
  SPC_LastNameLabel,
  SPC_EmailLabel,
} = SecondaryPOCInformation;
const { mentorsHeading, oracleIDLabel } = Mentors;
const { additionalDocsHeading, docsLabel } = additionalDocs;

export default function TrainingForm({
  isEditMode,
  isEditable,
  closeModal,
  selected,
}) {
  const [usersData, setUsersData] = useState([]);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState(trainingPageFormFields);
  //Typeahead Search state
  const [POCPrimaryOracleID, setPOCPrimaryOracleID] = useState(null);
  const [POCSecondaryOracleID, setPOCSecondaryOracleID] = useState(null);
  const [mentors, setMentors] = useState(null);

  const PPC_Ref = useRef(null);
  const SPC_Ref = useRef(null);
  const mentorsRef = useRef(null);

  const dispatch = useDispatch();
  const {
    trainingCode,
    trainingName,
    startDate,
    endDate,
    type,
    phase,
    status,
    PPC_OracleID,
    PPC_FirstName,
    PPC_LastName,
    PPC_Email,
    SPC_oracleID,
    SPC_FirstName,
    SPC_LastName,
    SPC_Email,
    oracleID,
    docs,
  } = form;

  // Setting Users TypeHead Values
  const userSelectData = usersData.map((item) => {
    const name = item.OracleId;
    return {
      value: name,
      label: name,
    };
  });

  const mentorsData = usersData.map((item) => {
    const name = `${item?.OracleId} - ${item?.FirstName}`;
    return {
      value: name,
      label: name,
    };
  });

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      setUsersData(data);
    })();
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFiles = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log("base64b", base64);
    setFiles((files) => [...files, e.target.files]);
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  console.log(PPC_Ref);

  const clearModal = () => {
    setForm(trainingPageFormFields);
    PPC_Ref.current?.Select?.clearValue();
    SPC_Ref.current?.Select?.clearValue();
    mentorsRef.current?.Select?.clearValue();
  };

  const setUsersDetailsByOracleId = (e, isSecondary) => {
    setPOCPrimaryOracleID(e.value);
    setPOCSecondaryOracleID(e.value);

    const selectedUser = usersData.filter(
      (item) => item.OracleId == e.value
    )[0];
    console.log("selectedUser", selectedUser);
    if (!isSecondary) {
      setForm((prev) => ({
        ...prev,
        PPC_OracleID: selectedUser?.OracleId,
        PPC_FirstName: selectedUser?.FirstName,
        PPC_LastName: selectedUser?.LastName,
        PPC_Email: selectedUser?.Email,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        SPC_oracleID: selectedUser?.OracleId,
        SPC_FirstName: selectedUser?.FirstName,
        SPC_LastName: selectedUser?.LastName,
        SPC_Email: selectedUser?.Email,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      oracleID: mentors?.map((item) => item?.value.split("-")[0]).join(","),
      docs: files,
      id: uuid(),
    };
    dispatch(addNewTraining(data));
    clearModal();
    closeModal();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      oracleID: mentors?.map((item) => item?.value.split("-")[0]).join(","),
      docs: files,
      id: uuid(),
    };
    dispatch(updateTrainingData({ id: selected?.id, data }));
    clearModal();
    closeModal();
  };

  // Setting Pre Populated Values in the Inputbox
  useEffect(() => {
    if (isEditMode && selected) {
      setForm({
        trainingCode: selected?.trainingCode,
        trainingName: selected?.trainingName,
        startDate: selected?.startDate,
        phase: selected?.phase,
        endDate: selected?.endDate,
        status: selected?.status,
        type: selected?.type,
      });
    }
  }, [selected, isEditMode]);

  return (
    <div className="container mt-3">
      <Head>
        <title>Trainings</title>
      </Head>
      <h4 className="text-secondary text-center fw-semibold mb-3">
        {isEditMode ? UpdateTrainingHeader : AddTrainingHeader}
      </h4>
      <form
        className={styles.trainingForm}
        onSubmit={isEditMode ? handleUpdate : handleSubmit}
      >
        <div className={styles.formSection}>
          <div className="mx-3">
            <p className="text-secondary fw-bold">
              {trainingInformationHeading}
            </p>
            <div className="mb-3 mt-3">
              <label htmlFor="trainingCode">
                {trainingCodeLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="trainingCode"
                name="trainingCode"
                value={trainingCode}
                aria-label="trainingCode"
                onChange={onHandleChange}
                maxLength={10}
                required={true}
                readOnly={isEditMode ? true : false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="trainingName">
                {trainingNameLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="trainingName"
                name="trainingName"
                value={trainingName}
                aria-label="trainingName"
                onChange={onHandleChange}
                maxLength={30}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate">
                {startDateLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                aria-label="startDate"
                value={startDate}
                onChange={onHandleChange}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate">
                {endDateLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                aria-label="endDate"
                value={endDate}
                onChange={onHandleChange}
                required={true}
              />
            </div>
            {!isEditMode && (
              <div className="mb-3">
                <label htmlFor="type">
                  {typeLabel} <span className={styles.required}>*</span>
                </label>
                <select
                  id="type"
                  className="form-control"
                  required={true}
                  name="type"
                  aria-label="type"
                  value={type}
                  onChange={onHandleChange}
                >
                  {["Instructor led", "Self placed"].map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isEditMode && (
              <>
                <div className="mb-3 mt-3 ">
                  <label htmlFor="phase">
                    {phaseLabel} <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="phase"
                    name="phase"
                    data-testid="select"
                    className="form-control"
                    aria-label="phase"
                    required={true}
                    value={phase}
                    onChange={onHandleChange}
                    // readOnly={isEditable}
                  >
                    {[
                      "Upcoming",
                      "Sessions in progress",
                      "Capstone phase",
                      "Assessment phase",
                      "Finished",
                    ].map((item, idx) => (
                      <option
                        value={item}
                        key={idx}
                        data-testid="select-option"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 mt-3 ">
                  <label htmlFor="status">
                    {statusLabel} <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={onHandleChange}
                    className="form-control"
                    aria-label="status"
                    required={true}
                  >
                    <option value="" selected disabled={true} hidden>
                      status
                    </option>
                    {["Yet to start", "In progress", "Finished"].map(
                      (item, idx) => (
                        <option key={idx} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="mx-3">
            <p className="text-secondary fw-bold">{PPC_InformationHeading}</p>
            <div className="mb-3 mt-3">
              <label htmlFor="POCPrimaryOracleID">
                {PPC_OracleIDLabel} <span className={styles.required}>*</span>
              </label>
              <Select
                defaultValue={POCPrimaryOracleID}
                onChange={(e) => setUsersDetailsByOracleId(e, false)}
                options={userSelectData}
                id="POCPrimaryOracleID"
                name="POCPrimaryOracleID"
                ref={PPC_Ref}
                placeholder=""
                aria-label="POCPrimaryOracleID"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "5px",
                  colors: {
                    ...theme.colors,
                  },
                })}
                className=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="POCPrimaryFirstName">
                {PPC_FirstNameLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="POCPrimaryFirstName"
                name="POCPrimaryFirstName"
                aria-label="POCPrimaryFirstName"
                value={PPC_FirstName}
                onChange={onHandleChange}
                required={true}
                readOnly={isEditable}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="POCPrimaryLastName">
                {PPC_LastNameLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="POCPrimaryLastName"
                name="POCPrimaryLastName"
                aria-label="POCPrimaryLastName"
                value={PPC_LastName}
                onChange={onHandleChange}
                required={true}
                readOnly={isEditable}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="POCPrimaryEmail">
                {PPC_EmailLabel} <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="POCPrimaryEmail"
                name="POCPrimaryEmail"
                aria-label="POCPrimaryEmail"
                value={PPC_Email}
                onChange={onHandleChange}
                required={true}
                readOnly={isEditable}
              />
            </div>
          </div>
          <div>
            <div>
              <p className="text-secondary fw-bold">{SPC_InformationHeading}</p>
              <div className="mb-3 mt-3">
                <label htmlFor="POCSecondaryOracleID">
                  {SPC_oracleIDLabel} <span className={styles.required}>*</span>
                </label>
                <Select
                  defaultValue={POCSecondaryOracleID}
                  onChange={(e) => setUsersDetailsByOracleId(e, true)}
                  options={userSelectData}
                  id="POCSecondaryOracleID"
                  name="POCSecondaryOracleID"
                  aria-label="POCSecondaryOracleID"
                  ref={SPC_Ref}
                  placeholder=""
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "5px",
                    colors: {
                      ...theme.colors,
                    },
                  })}
                  className=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="POCSecondaryFirstName">
                  {SPC_FirstNameLabel}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="POCSecondaryFirstName"
                  name="POCSecondaryFirstName"
                  aria-label="POCSecondaryFirstName"
                  value={SPC_FirstName}
                  onChange={onHandleChange}
                  required={true}
                  readOnly={isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="POCSecondaryLastName">
                  {SPC_LastNameLabel} <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="POCSecondaryLastName"
                  name="POCSecondaryLastName"
                  aria-label="POCSecondaryLastName"
                  value={SPC_LastName}
                  onChange={onHandleChange}
                  required={true}
                  readOnly={isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="POCSecondaryEmail">
                  {SPC_EmailLabel} <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="POCSecondaryEmail"
                  aria-label="POCSecondaryEmail"
                  name="POCSecondaryEmail"
                  value={SPC_Email}
                  onChange={onHandleChange}
                  required={true}
                  readOnly={isEditable}
                />
              </div>
            </div>
            <div>
              <p className="text-secondary fw-bold">{mentorsHeading}</p>
              <div className="mb-3">
                <label htmlFor="mentorsOracleID">
                  {oracleIDLabel} <span className={styles.required}>*</span>
                </label>
                <Select
                  defaultValue={mentors}
                  onChange={setMentors}
                  options={mentorsData}
                  formatOptionLabel={mentorsData}
                  id="mentorsOracleID"
                  aria-label="mentorsOracleID"
                  name="mentorsOracleID"
                  ref={mentorsRef}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "5px",
                    colors: {
                      ...theme.colors,
                    },
                  })}
                  className=""
                  placeholder=""
                  isMulti
                />
              </div>
              <p className="text-secondary fw-bold">{additionalDocsHeading}</p>
              <div className="mb-3 mt-3">
                <label htmlFor="attachments">{docsLabel}</label>
                <input
                  type="file"
                  data-testid="fileInput"
                  className="form-control"
                  id="attachments"
                  aria-label="attachments"
                  name="attachments"
                  // value={docs}
                  onChange={handleFiles}
                  accept=".jpg, .jpeg, .pdf"
                  multiple={true}
                />
              </div>
              <div className="mb-5">
                {isEditMode ? (
                  <PrimaryButton
                    text={UpdateTrainingButtonText}
                    type="submit"
                  />
                ) : (
                  <SecondaryButton text={AddTrainingButtonText} type="submit" />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
