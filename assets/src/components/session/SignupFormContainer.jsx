import { connect } from 'react-redux';
import SignUpForm from './SessionForm';
import { signUp } from '../../actions/auth/SessionActions';

const FIELDS = [
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'password', label: 'Password', type: 'password' },
];

const mapStateToProps = () => ({
  fields: FIELDS,
  headerText: 'Welcome to Slackr 2.0',
  buttonText: 'Sign Up',
});

const mapDispatchToProps = dispatch => ({
  formAction: user => dispatch(signUp(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
