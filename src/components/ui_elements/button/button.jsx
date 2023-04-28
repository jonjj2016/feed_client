import { Button as MantineButton } from "@mantine/core";

const Button = ({ ...rest }) => {
  return <MantineButton color="violet" className="app-button" {...rest} />;
};

Button.propTypes = {
  ...MantineButton.propTypes,
};

export default Button;
