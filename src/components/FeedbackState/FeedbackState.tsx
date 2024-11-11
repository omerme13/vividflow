import { FeedbackStateProps } from "./FeedbackState.typs";

import "./FeedbackState.scss";

export default function FeedbackState({ icon: Icon, title, description }: FeedbackStateProps) {
    return (
        <div className="feedback-state">
            <h2 className="feedback-state__text">{title}</h2>
            {description && <h3 className="feedback-state__text">{description}</h3>}
            <Icon className="feedback-state__icon" />
        </div>
    );
}
