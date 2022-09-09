import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
//import styles from "./ShowTrainingsDetails.module.css";

const ShowTrainingsDetails = () => {
  const { selectedTraining } = useSelector((state) => state.trainings);
  return (
    <Container>
      <h3 className="mb-4" style={{ fontWeight: "300", textAlign: "center" }}>
        Training details preview
      </h3>

      <Row>
        <Col sm={3}>
          <h5
            className="mb-3"
            style={{ fontWeight: "bold", fontSize: "medium" }}
          >
            Training Details
          </h5>
          <h6>Code:<span className="fw-bold"> {selectedTraining.trainingCode}</span></h6>
          <h6>Name:<span className="fw-bold"> {selectedTraining.trainingName}</span></h6>
          <h6>startDate:<span className="fw-bold"> {selectedTraining.startDate}</span></h6>
          <h6>endDate:<span className="fw-bold"> {selectedTraining.endDate}</span></h6>
          <h6>Status:<span className="fw-bold"> {selectedTraining.status}</span></h6>
          <h6>Type:<span className="fw-bold"> {selectedTraining.type}</span></h6>
        </Col>
        <Col style={{ wordBreak: "break-all" }} sm={5}>
          <h5
            className="mb-3"
            style={{ fontWeight: "bold", fontSize: "medium" }}
          >
            PPC Details
          </h5>

          <h6>PPC_OracleID:<span className="fw-bold"> {selectedTraining.PPC_OracleID}</span></h6>
          <h6>PPC_FirstName: <span className="fw-bold">{selectedTraining.PPC_FirstName}</span></h6>
          <h6>PPC_LastName: <span className="fw-bold">{selectedTraining.PPC_LastName}</span></h6>
          <h6>PPC_Email:<span className="fw-bold"> {selectedTraining.PPC_Email}</span></h6>
        </Col>
        <Col style={{ wordBreak: "break-all" }} sm={4}>
          <h5
            className="mb-3"
            style={{ fontWeight: "bold", fontSize: "medium" }}
          >
            SPC Details
          </h5>

          <h6>SPC_oracleID: <span className="fw-bold">{selectedTraining.SPC_oracleID}</span></h6>
          <h6>SPC_FirstName:<span className="fw-bold"> {selectedTraining.SPC_FirstName}</span></h6>
          <h6>SPC_LastName: <span className="fw-bold">{selectedTraining.SPC_LastName}</span></h6>
          <h6>SPC_Email:<span className="fw-bold"> {selectedTraining.SPC_Email}</span></h6>
          <h6>oracleID: <span className="fw-bold">{selectedTraining.oracleID}</span></h6>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowTrainingsDetails;
