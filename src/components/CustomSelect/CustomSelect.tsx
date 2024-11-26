import Select, { Props } from "react-select";

import "./CustomSelect.scss";

export default function CustomSelect(props: Props) {
    return (
        <Select
		{...props}
			className="custom-select-wrapper"
            classNamePrefix="custom-select"
            classNames={{ menuList: () => "scrollbar" }}
        />
    );
}