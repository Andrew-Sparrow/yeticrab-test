import PropTypes from 'prop-types';

export default PropTypes.shape({
  'id': PropTypes.number.isRequired,
  'company': PropTypes.string.isRequired,
  'carrier_first_name': PropTypes.string.isRequired,
  'carrier_middle_name': PropTypes.string.isRequired,
  'carrier_last_name': PropTypes.string.isRequired,
  "date": PropTypes.string,
  "phone": PropTypes.string,
  "comment": PropTypes.string,
  "ati": PropTypes.string,
  "favorite": PropTypes.bool,
});
