import Select, { GroupBase, Props } from "react-select";

import "./CustomSelect.scss";

interface Option {
    label: string;
    value: string;
}

type CustomSelectProps<IsMulti extends boolean = false> = Omit<
    Props<Option, IsMulti, GroupBase<Option>>,
    "classNamePrefix"
> & { isMulti?: IsMulti };

function CustomSelect<IsMulti extends boolean = false>(props: CustomSelectProps<IsMulti>) {
    return (
        <Select<Option, IsMulti, GroupBase<Option>>
            classNamePrefix="custom-select"
            className="custom-select-wrapper"
            {...props}
        />
    );
}

export default CustomSelect;
