import { connect } from "react-redux";
import { fetchFromApi } from "./components/store/actions/api_actions";
import Home from "./home";

const mapStateToProps = state => {
  return { 
    API: state.APIReducer
   };
};

const mapDispatchToProps = dispatch => {
  return {
    startFetch: () => dispatch(fetchFromApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);