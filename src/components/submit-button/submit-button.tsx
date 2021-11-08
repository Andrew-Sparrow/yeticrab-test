import React from 'react';

interface SubmitButtonProps {
  isFormLoading: boolean;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const {isFormLoading} = props;

  return (
    <button
      className={`press-button press-button__submit ${isFormLoading && "press-button--disabled"}`}
      type="submit"
      disabled={isFormLoading}
    > {isFormLoading ? 'Adding ...' : 'Add'}</button>
  );
};

export default SubmitButton;
