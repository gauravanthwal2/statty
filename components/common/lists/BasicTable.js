import styles from "./BasicTable.module.css";
import React, { forwardRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { TiArrowUnsorted } from "react-icons/ti";
import { BsPencilSquare } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import FilterInput from "./FilterInput";
import PaginationInput from "./PaginationInput";
import { setSelectedParticipant } from "../../../redux/addParticipants/addParticipantSlice";
import { setSelectedTraining } from "../../../redux/addTrainings/addTrainingSlice";
import SecondaryButton from "../buttons/secondaryButton/SecondaryButton";
import { AddParticipantButtonText } from "../../../utils/constants/participantPageConstants";
import { AddTrainingButtonText } from "../../../utils/constants/trainingPageConstants";

const BasicTable = ({
  columnData,
  tableData,
  isTraining,
  showEditForm,
  showDetailsForm,
  showAddParticipantFormInModal,
  showAddTrainingFormInModal,
}) => {
  const dispatch = useDispatch();
  const columns = useMemo(() => columnData, [columnData]);
  const data = useMemo(() => tableData, [tableData]);

  const showEditModal = (userData) => {
    showEditForm();
    if (isTraining) {
      dispatch(setSelectedTraining(userData));
    } else {
      dispatch(setSelectedParticipant(userData));
    }
  };

  const showDetailsModal = (userData) => {
    
   dispatch(setSelectedTraining(userData));
   showDetailsForm()
   
  };

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          {isTraining ? (
            <SecondaryButton
              text={AddTrainingButtonText}
              onClick={showAddTrainingFormInModal}
            />
          ) : (
            <SecondaryButton
              text={AddParticipantButtonText}
              onClick={showAddParticipantFormInModal}
            />
          )}
        </div>
        <div>
          <FilterInput
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup, index) => {
              return (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup?.headers[index]?.key}
                >
                  <th>Actions</th>
                  {headerGroup.headers.map((column, index) => {
                    return (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={index}
                      >
                        {column.render("Header")}
                        <span aria-roledescription="button">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <TiArrowUnsorted />
                            ) : (
                              <TiArrowUnsorted />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {isTraining ? (
                    <td>
                      <div className="d-flex justify-content-around">
                        <span role="button" aria-label="editButton">
                          <BsPencilSquare
                            onClick={() => showEditModal(row.values)}
                          />
                        </span>
                        <span role="button" aria-label="showButton">
                          <BiInfoCircle
                            onClick={() => showDetailsModal(row.values)}
                          />
                        </span>
                      </div>
                    </td>
                  ) : (
                    <td className="text-center">
                      <span role="button" aria-label="showModalButton">
                        <BsPencilSquare
                          onClick={() => showEditModal(row.values)}
                        />
                      </span>
                    </td>
                  )}
                  {row.cells.map((cell, index) => {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="my-1 d-flex justify-content-start align-items-center">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <PaginationInput pageIndex={pageIndex} gotoPage={gotoPage} />
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="btn btn-sm mx-1"
          aria-label="previous page"
        >
          <HiOutlineChevronDoubleLeft />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn btn-sm mx-1"
        >
          Prev
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="btn btn-sm mx-1"
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="btn btn-sm mx-1"
          aria-label="next page"
        >
          <HiOutlineChevronDoubleRight />
        </button>
      </div>
    </>
  );
};

export default forwardRef(BasicTable);
