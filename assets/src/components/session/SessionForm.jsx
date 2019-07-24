import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class SessionForm extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    submitted: false,
    sending: false,
  };

  handleSubmit = e => {
    this.setState({ submitted: true });
    e.preventDefault();
    this.submit();
  };

  submit = async () => {
    const { email, username, password } = this.state;
    const user = { email, username, password };
    try {
      const { formAction } = this.props;
      this.setState({ sending: true });
      await formAction(user);
    } catch (error) {
      throw error;
    }
  };

  update = field => e => {
    this.setState({
      [field]: e.currentTarget.value,
      submitted: false,
    });
  };

  renderInputFields = () => {
    const { state, props } = this;
    const { fields } = props;
    return fields.map(field => {
      const value = state[field.key];
      return (
        <Fragment key={field.key}>
          <p>{field.label}</p>
          <input type={field.type} className="default-input" value={value} onChange={this.update(field.key)} />
        </Fragment>
      );
    });
  };

  render() {
    const { submitted, sending } = this.state;
    const { buttonText, headerText } = this.props;
    const isSubmitted = submitted && sending;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <p className="form-header">{headerText}</p>
        {this.renderInputFields()}
        <button disabled={isSubmitted} type="submit" className="default-button">
          {isSubmitted ? 'loading' : buttonText}
        </button>
      </form>
    );
  }
}

SessionForm.propTypes = {
  fields: PropTypes.instanceOf(Array).isRequired,
  formAction: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  headerText: PropTypes.string,
};

SessionForm.defaultProps = {
  buttonText: '',
  headerText: '',
};

export default SessionForm;
