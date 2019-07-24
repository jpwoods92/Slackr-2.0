import { connect } from 'react-redux';
import LoginForm from './SessionForm';
import { login } from '../../actions/auth/SessionActions';

const FIELDS = [
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Password', type: 'password' },
];

const mapStateToProps = () => ({
  fields: FIELDS,
  headerText: 'Welcome Back!',
  buttonText: 'Login',
});

const mapDispatchToProps = dispatch => ({
  formAction: user => dispatch(login(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
