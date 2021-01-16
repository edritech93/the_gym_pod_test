import {connect} from 'react-redux';
import {showAlert} from '../actions/app';
import Screen from './../screens/Profile';

const mapStateToProps = (state, ownProps) => {
  const {profile} = state.app;
  return {profile};
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (args) => dispatch(showAlert(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
