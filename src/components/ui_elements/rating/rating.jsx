import { Box, Rating as MantineRating, Text } from "@mantine/core";
import { forwardRef } from "react";

const Rating = forwardRef(({ label, ...rest }, ref) => {
  return (
    <Box>
      {label && (
        <Text fz="sm" fw={700}>
          {label}
        </Text>
      )}
      <MantineRating className="app-rating" {...rest} ref={ref} />
    </Box>
  );
});

export default Rating;
