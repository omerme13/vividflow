import { ChangeEvent } from "react";
import { CalendarIcon, DashboardIcon, SettingsIcon } from "@/assets/icons";
import Input from "@/components/Input";
import CustomSelect from "@/components/CustomSelect";
import { PreferenceDateFormat, PreferenceActivityCount } from "@/types/preference";
import { usePreferences } from "@/context/PreferenceContext";
import Checkbox from "@/components/Checkbox";
import { SettingRowProps, SettingsSectionProps } from "./types";

import "./SettingsPage.scss";
import { activityCountOptions, dateFormatOptions } from "./constants";

function SettingsSection({ icon, title, children }: SettingsSectionProps) {
    return (
        <div className="settings-section">
            <div className="settings-section__header">
                {icon}
                <h2>{title}</h2>
            </div>
            {children}
        </div>
    );
}

function SettingRow({ label, description, children }: SettingRowProps) {
    return (
        <div className="settings-row">
            <div className="settings-row__content">
                <div className="settings-row__label">{label}</div>
                <div className="settings-row__description">{description}</div>
            </div>
            <div className="settings-row__control">{children}</div>
        </div>
    );
}

export default function Settings() {
    const { preferences, updatePreferences } = usePreferences();

    return (
        <div className="settings-page">
            <header className="settings-header">
                <h1>Settings</h1>
                <p>Manage your app preferences</p>
            </header>

            <SettingsSection icon={<SettingsIcon />} title="General">
                <div className="settings-card">
                    <SettingRow label="Date Format" description="Choose your preferred date format">
                        <CustomSelect
                            options={dateFormatOptions}
                            value={dateFormatOptions.find((format) => format.value === preferences.dateFormat)}
                            onChange={(option) => {
                                if (option) {
                                    updatePreferences({
                                        dateFormat: option.value as PreferenceDateFormat,
                                    });
                                }
                            }}
                            isSearchable={false}
                        />
                    </SettingRow>

                    <SettingRow label="Username" description="Set your display name">
                        <Input
                            value={preferences.username}
                            onChange={(value) => {
                                updatePreferences({ username: value });
                            }}
                            placeholder="Enter username"
                            className="settings-page__input"
                        />
                    </SettingRow>
                </div>
            </SettingsSection>

            <SettingsSection icon={<CalendarIcon />} title="Calendar">
                <div className="settings-card">
                    <SettingRow label="Show Completed Events" description="Display completed tasks in calendar view">
                        <Checkbox
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                updatePreferences({
                                    showCompletedEvents: e.target.checked,
                                });
                            }}
                            checked={preferences.showCompletedEvents}
                        />
                    </SettingRow>
                </div>
            </SettingsSection>

            <SettingsSection icon={<DashboardIcon />} title="Dashboard">
                <div className="settings-card">
                    <SettingRow label="Recent Activities" description="Number of activities to display">
                        <CustomSelect
                            options={activityCountOptions}
                            value={activityCountOptions.find(
                                (option) => option.value === preferences.recentActivitiesCount
                            )}
                            onChange={(option) => {
                                if (option) {
                                    updatePreferences({
                                        recentActivitiesCount: option.value as PreferenceActivityCount,
                                    });
                                }
                            }}
                            isSearchable={false}
                        />
                    </SettingRow>
                </div>
            </SettingsSection>
        </div>
    );
}
