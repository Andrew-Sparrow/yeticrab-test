import {useTypedSelector} from '../../hooks/useTypedSelector';
import {getFormErrorMessage} from '../../store/form/selectors';

function ErrorMessage() {
  const errorMessage = useTypedSelector(getFormErrorMessage);

  return (
    <div className="order__message order__message--error">
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorMessage;
