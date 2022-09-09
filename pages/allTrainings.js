import React from "react";
import { useState, useEffect, useRef } from "react";
import { COLUMNS } from "./../utils/tableColumns/trainingTableColumn";
import { Row, Col, Container } from "react-bootstrap";
import Modal from "../components/common/modal/Modal";
import AddTrainingsDetails from "../components/addTrainingsDetails/AddTrainingsDetails";
import EditTrainingsDetails from "../components/editTrainingsDetails/EditTrainingsDetails";
import ShowTrainingsDetails from "../components/showTrainingsDetails/ShowTrainingsDetails";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getAllTrainingsData } from "../redux/addTrainings/addTrainingSlice";
import { wrapper } from "../redux/store";
import PageLayout from "../components/common/pageLayout/PageLayout";
import dynamic from 'next/dynamic'

const BasicTable = dynamic(() => import("../components/common/lists/BasicTable"), {
  suspense: true,
})

export default function Trainings({ allTrainings }) {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.login);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);
  const editModalRef = useRef(null);
  const addModalRef = useRef(null);
  const viewModalRef = useRef(null);

  const showAddTrainingFormInModal = () => {
    addModalRef.current.showModal();
  };

  const hideAddTrainingFormInModal = () => {
    addModalRef.current.close();
  };

  const showEditTrainingFormInModal = () => {
    editModalRef.current.showModal();
  };

  const hideEditTrainingFormInModal = () => {
    editModalRef.current.close();
  };
  const showTrainingDetailsInModal = () => {
    viewModalRef.current.showModal();
  };

  return (
    <PageLayout>
      <Container>
        <div className="training-container mt-3">
          <Modal ref={viewModalRef}>
            <ShowTrainingsDetails />
          </Modal>
          <Modal ref={editModalRef}>
            <EditTrainingsDetails closeModal={hideEditTrainingFormInModal} />
          </Modal>
          <Modal ref={addModalRef}>
            <AddTrainingsDetails closeModal={hideAddTrainingFormInModal} />
          </Modal>
          <Row>
            <Col sm={12}>
              {allTrainings && (
                <BasicTable
                  columnData={COLUMNS}
                  tableData={allTrainings}
                  isTraining={true}
                  showEditForm={showEditTrainingFormInModal}
                  showDetailsForm={showTrainingDetailsInModal}
                  showAddTrainingFormInModal={showAddTrainingFormInModal}
                />
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await store.dispatch(getAllTrainingsData());
    const allTrainings = store.getState()?.trainings?.allTrainings;
    return {
      props: {
        allTrainings,
      },
    };
  }
);
