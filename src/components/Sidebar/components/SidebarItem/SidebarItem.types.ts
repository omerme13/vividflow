import { FC, SVGProps } from "react";

export interface SideBarItemData {
	text: string;
	action: () => void;
	icon: FC<SVGProps<SVGSVGElement>>
}

export interface SidebarItemProps extends SideBarItemData {
	isCompactSidebar: boolean;
}
