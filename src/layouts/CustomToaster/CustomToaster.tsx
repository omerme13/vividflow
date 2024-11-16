import { Toast, ToastBar, Toaster, toast } from "react-hot-toast";

import "./CustomToaster.scss";

interface CustomToast extends Toast {
	action: {
		label: string;
		onClick: (id: string) => void;
	}
}
export default function CustomToaster() {
    const onButtonClick = (t: CustomToast) => {
        toast.dismiss(t.id);
        t.action.onClick(t.id);
    };

    return (
        <Toaster>
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <div className="custom-toast">
                            {icon}
                            {message}
                            {t.type !== "loading" && <button onClick={() => onButtonClick(t)}>{t.action.label}</button>}
                        </div>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}
