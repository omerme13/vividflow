import { UserDetailsProps } from "./UserDetails.interface";
import { defaultAvatarUrl } from "./constants";

import "./UserDetails.scss";

export default function UserDetails({ imageUrl = defaultAvatarUrl, name }: UserDetailsProps) {
    return (
        <div className="user-details">
            <img src={imageUrl} className="user-details__image" />
            <div className="user-details__name">{name}</div>
        </div>
    );
}