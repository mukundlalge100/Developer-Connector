import React from "react";
import Modal from "../../Containers/Modal/Modal";
import utilClasses from "../../Util/Util.module.scss";
import PropTypes from "prop-types";

const SomethingWentWrong = props => {
  return (
    <Modal
      show={props.somethingWentWrong}
      closeModal={props.somethingWentWrongCloseHandler}
    >
      <div className={utilClasses.Tertiary__Heading}>
        {props.somethingWentWrong}
      </div>
    </Modal>
  );
};

SomethingWentWrong.propTypes = {
  somethingWentWrong: PropTypes.string.isRequired,
  somethingWentWrongCloseHandler: PropTypes.func.isRequired
};

export default SomethingWentWrong;
