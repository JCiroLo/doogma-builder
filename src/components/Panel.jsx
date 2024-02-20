import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function Panel({ children, value, index, ...other }) {
  return (
    value === index && (
      <section role="tabpanel" id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && <Box>{children}</Box>}
      </section>
    )
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Panel;
