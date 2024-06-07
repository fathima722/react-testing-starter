// import Onboarding from "../components/Onboarding";
// import ExpandableText from "../components/ExpandableText";
// import SearchBox from "../components/SearchBox";
// import TermsAndConditions from "../components/TermsAndConditions";
// import ToastDemo from "../components/ToastDemo";
// import {Toaster} from 'react-hot-toast';

import OrderStatusSelector from "../components/OrderStatusSelector";

const PlaygroundPage = () => {
  // return <ExpandableText text="short text" />;
  // return <SearchBox onChange={(text) => console.log(text)} />
  // return <>
  //   <ToastDemo/>
  //   <Toaster/>
  // </>
  return <OrderStatusSelector onChange={console.log}/> //same as onChange={value => console.log(value)}
};

export default PlaygroundPage;
