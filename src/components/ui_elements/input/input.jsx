import {TextInput as MantineInput} from "@mantine/core";
import { forwardRef } from "react";

const TextInput = forwardRef(({...rest}, ref) => {
    return <MantineInput className="app-text-field" {...rest} ref={ref}/>
});

export default TextInput;