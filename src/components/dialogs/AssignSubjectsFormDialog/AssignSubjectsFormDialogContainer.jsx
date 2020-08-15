import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignSubjectsFormDialog from "./AssignSubjectsFormDialog";
import { getSubjectFieldsRequest } from "../../../actions";

const AssignSubjectsFormDialogContainer = ({ ...modalProps }) => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      subjects: state.fields.data?.subjectFields,
    };
  });

  const dispatchToProps = {
    getSubjectsFields: useCallback(() => dispatch(getSubjectFieldsRequest()), [
      dispatch,
    ]),
  };

  return (
    <AssignSubjectsFormDialog
      {...dispatchToProps}
      {...stateToProps}
      {...modalProps}
    />
  );
};

export default AssignSubjectsFormDialogContainer;
