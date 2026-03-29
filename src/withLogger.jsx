import { useDispatch } from "react-redux";

const withLogger = (WrapperComponent) => {
  return (props) => {
    const dispatch = useDispatch();

    const customDispatch = (action) => {
      console.log(action.type);
      return dispatch(action);
    };

    return (
      <WrapperComponent {...props} dispatch={customDispatch}></WrapperComponent>
    );
  };
};
export default withLogger;
