import { FC } from "react";
import { UserDetailsProps } from "./UserDetails.interface";
import { defaultAvatarUrl } from "./constants";

import './UserDetails.scss';

const UserDetails: FC<UserDetailsProps> = ({ imageUrl = defaultAvatarUrl, name }) => {
	return <div className="user-details">
		<img src={imageUrl} className="user-details__image" />
		<div className="user-details__name">{name}</div>
	</div>
}
 
export default UserDetails;