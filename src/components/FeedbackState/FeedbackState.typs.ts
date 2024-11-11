import { FC, SVGProps } from "react";

export interface FeedbackStateProps {
	icon: FC<SVGProps<SVGSVGElement>>
	title: string;
	description?: string;
}