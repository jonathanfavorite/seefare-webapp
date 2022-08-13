import React, { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { MapContext } from "../../../contexts/MapContext";
import "./Tag.scss";

function Tag(props: any) {

    const appCtx = useContext(AppContext);
    const mapCtx = useContext(MapContext);

    let tag= props.tag;
    
    function handleTagClickEvent(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (event.currentTarget.getAttribute("data-id")) {
            const tagID = event.currentTarget.getAttribute("data-id");
            if (tagID) {
                if(parseInt(tagID) == mapCtx.selectedTagID) {
                    mapCtx.updateSelectedTagID(0);
                } else {
                    mapCtx.updateSelectedTagID(parseInt(tagID));
                }
                
            }
        }
    }

    return (
        <div
            onClick={handleTagClickEvent}
            data-id={tag.id}
            className={`tag ${
                mapCtx.selectedTagID == tag.id ? "activeTag" : ""
            }`}
        >
            {tag.name}
        </div>
    );
}

export default Tag;
