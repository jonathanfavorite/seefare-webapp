import React, { useContext, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { MapContext } from "../../../contexts/MapContext";
import Tag from "../../atoms/tag/Tag";

import "./TagList.scss";

function TagList() {
    const appCtx = useContext(AppContext);
    const mapCtx = useContext(MapContext);

    function handleTagClickEvent(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (event.currentTarget.getAttribute("data-id")) {
            const tagID = event.currentTarget.getAttribute("data-id");
            if (tagID) {
                mapCtx.updateSelectedTagID(parseInt(tagID));
            }
        }
    }

    return (
        <div className="tags-wrap">
            <div className="tags-list">
                {appCtx.tags.map((item, index) => {
                    return <Tag tag={item} key={index} />;
                })}
            </div>
        </div>
    );
}

export default TagList;
