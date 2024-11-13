import { Page } from "@/types/layout";
import { FC, SVGProps } from "react";

export interface SideBarItemData {
	page: Page;
	icon: FC<SVGProps<SVGSVGElement>>
}

export interface SidebarItemProps extends SideBarItemData {
	isCompactSidebar: boolean;
}
