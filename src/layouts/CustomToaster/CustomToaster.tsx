import { Toast, ToastBar, Toaster, toast } from "react-hot-toast";
import "./CustomToaster.scss";

interface CustomToast extends Toast {
    action?: {
        label: string;
        onClick: (id: string) => void;
    };
}

export default function CustomToaster() {
    const onButtonClick = (t: CustomToast) => {
        toast.dismiss(t.id);
        t.action?.onClick(t.id);
    };

    return (
        <Toaster>
            {(t: Toast) => {
                const customToast = t as CustomToast;
				
                return (
                    <ToastBar
                        toast={t}
                        style={
                            {
                                background: "var(--color-purple-10)",
								overflow: 'hidden',
                                "--toast-duration": `${t.duration}ms`,
                            } as React.CSSProperties
                        }
                    >
                        {({ icon, message }) => (
                            <div className="custom-toast">
                                {icon}
                                {message}
                                {customToast.type !== "loading" && customToast.action && (
                                    <button onClick={() => onButtonClick(customToast)} className="custom-toast__button">
                                        {customToast.action.label}
                                    </button>
                                )}
                            </div>
                        )}
                    </ToastBar>
                );
            }}
        </Toaster>
    );
}
