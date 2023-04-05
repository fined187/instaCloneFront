import {PropTypes} from "prop-types";
import { Helmet } from "react-helmet-async"

const PageTitle = ({title}) => {
  return <Helmet>{title} | Instagram</Helmet>;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;