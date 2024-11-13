import { Component, ReactNode, PropsWithChildren } from "react";
import FeedbackState from "../FeedbackState/FeedbackState";
import { ErrorIcon } from "@/assets/icons";

import './ErrorBoundary.scss';

interface Props extends PropsWithChildren {
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="error-boundary">
                        <FeedbackState icon={ErrorIcon} title="Something went wrong" />
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
