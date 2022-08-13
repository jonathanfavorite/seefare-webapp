import React, { ReactElement, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import {
    GasIcon,
    InfoIcon,
    PinIcon,
    SettingsIcon,
    WeatherIcon,
} from "../../atoms/icons/NavigationIcons";
import "./FooterNavigation.scss";

interface FooterItem {
    id: string;
    name: string;
    link: string;
    icon: ReactElement;
    class: string;
}

function FooterNavigation() {
    const appCtx = useContext(AppContext);

    const footerItems: FooterItem[] = [
        {
            id: "weather",
            name: "Weather",
            link: "/dashboard",
            icon: <WeatherIcon />,
            class: "weather-icon",
        },
        {
            id: "gas",
            name: "Gas",
            link: "/dashboard",
            icon: <GasIcon />,
            class: "gas-icon",
        },
        {
            id: "explore",
            name: "Explore",
            link: "/dashboard",
            icon: <PinIcon />,
            class: "explore-icon",
        },
        {
            id: "info",
            name: "Info",
            link: "/dashboard",
            icon: <InfoIcon />,
            class: "info-icon",
        },
        {
            id: "settings",
            name: "Settings",
            link: "/dashboard",
            icon: <SettingsIcon />,
            class: "settings-icon",
        },
    ];

    return (
        <div className="footer-navigation-wrap">
            <div className="content">
                <div className="footer-navigation">
                    {footerItems.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`item ${
                                    appCtx.currentScreen == item.id
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <div className="icon">
                                    {item.icon && item.icon}
                                </div>
                                <div className="text">{item.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FooterNavigation;
