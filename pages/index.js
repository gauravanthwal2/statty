import styles from "../styles/Home.module.css";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { COLUMNS } from "../utils/tableColumns/participantTableColumns";
import Modal from "../components/common/modal/Modal";
import EditParticipantsDetails from "../components/editParticipantsDetails/EditParticipantsDetails";
import AddParticipantsDetails from "../components/addParticipantsDetails/AddParticipant";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllParticipantsData } from "../redux/addParticipants/addParticipantSlice";
import { wrapper } from "../redux/store";
import PageLayout from "../components/common/pageLayout/PageLayout";
import dynamic from "next/dynamic";

const BasicTable = dynamic(
  () => import("../components/common/lists/BasicTable"),
  {
    suspense: true,
  }
);

export default function Home({ allParticipants }) {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state?.login);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);
  const editModalRef = useRef(null);
  const addModalRef = useRef(null);

  const showAddParticipantFormInModal = () => {
    addModalRef.current.showModal();
  };

  const hideAddParticipantFormInModal = () => {
    addModalRef.current.close();
  };

  const hideEditParticipantFormInModal = () => {
    editModalRef.current.close();
  };
  const showEditParticipantFormInModal = () => {
    editModalRef.current.showModal();
  };

  return (
    <PageLayout>
      <Container>
        <div className="mt-3">
          <Modal ref={editModalRef}>
            <EditParticipantsDetails
              closeModal={hideEditParticipantFormInModal}
            />
          </Modal>
          <Modal ref={addModalRef}>
            <AddParticipantsDetails
              closeModal={hideAddParticipantFormInModal}
            />
          </Modal>
          <Row>
            <Col sm={12}>
              {allParticipants ? (
                <BasicTable
                  columnData={COLUMNS}
                  tableData={allParticipants}
                  editModalRef={editModalRef}
                  showEditForm={showEditParticipantFormInModal}
                  showAddParticipantFormInModal={showAddParticipantFormInModal}
                />
              ) : (
                <h1>Loading... </h1>
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
    await store.dispatch(getAllParticipantsData());
    const allParticipants = store.getState()?.participants?.allParticipants;

    return {
      props: {
        allParticipants,
      },
    };
  }
);
