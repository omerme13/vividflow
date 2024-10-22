import { FC } from "react";
import { SidebarItemProps } from "./SidebarItem.types";

import './SidebarItem.scss';
 
const SidebarItem: FC<SidebarItemProps> = ({ text, action, icon: Icon}) => {
	return <div className="sidebar-item">
		<Icon className="sidebar-item__icon" onClick={action} />
		<div className="sidebar-item__text">{text}</div>
	</div>
}
 
export default SidebarItem;