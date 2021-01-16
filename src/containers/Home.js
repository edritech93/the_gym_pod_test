import { connect } from 'react-redux';
import { showAlert, profileChange, } from '../actions/app';
import Screen from './../screens/Home';

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: (args) => dispatch(showAlert(args)),
        profileChange: (args) => dispatch(profileChange(args)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
