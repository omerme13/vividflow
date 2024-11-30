import { PreferenceActivityCount, PreferenceDateFormat } from "@/types/preference";

export const dateFormatOptions = Object.entries(PreferenceDateFormat).map(([key, value]) => ({
    value,
    label: key,
}));

export const activityCountOptions = Object.values(PreferenceActivityCount).map((value) => ({
    value: value,
    label: `${value} Activities`,
}));