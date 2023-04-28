import {Textarea as MantineTextarea} from "@mantine/core";
import { forwardRef } from "react";

const Textarea = forwardRef(({...rest}, ref) => {
    return <MantineTextarea className="app-textarea-field" {...rest} ref={ref}/>
});

export default Textarea;