import { CheckIcon } from "@/assets/icons";
import { CheckboxProps } from "./Checkbox.types";

import "./Checkbox.scss";

export default function SettingCheckbox({ checked, onChange }: CheckboxProps) {
    return (
        <div className="checkbox-wrapper">
            <input type="checkbox" checked={checked} onChange={onChange} className="checkbox" />
            <CheckIcon width={14} height={14} className="checkbox-check-icon" />
        </div>
    );
}
