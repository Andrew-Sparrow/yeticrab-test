import React from 'react';

const EditButton = (props) => {
  const {isFormLoading} = props;

  return (
    <button
      className={`press-button press-button__submit ${isFormLoading && "press-button--disabled"}`}
      type="submit"
      disabled={isFormLoading}
    > {isFormLoading ? 'Editing ...' : 'Edit'}</button>
  );
};

export default EditButton;
