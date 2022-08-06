import React, { useContext, useState } from "react";
import "./TagList.scss";
import { AppContext } from "../../../contexts/AppContext";
import { MapContext } from "../../../contexts/MapContext";

function TagList() {
  const appCtx = useContext(AppContext);
  const mapCtx = useContext(MapContext);

  function handleTagClickEvent(event: React.MouseEvent<HTMLElement>) 
    {
        event.preventDefault();
        if(event.currentTarget.getAttribute('data-id'))
        {
            const tagID = event.currentTarget.getAttribute('data-id');
            if(tagID)
            {
              mapCtx.updateSelectedTagID(parseInt(tagID));
            }
        }
        
    }

  return (
    <div className="tags-wrap">
      <div className="tags-list">
        {appCtx.tags.map((item, index) => {
          return (
            <div onClick={handleTagClickEvent} data-id={item.id} className={`tag ${mapCtx.selectedTagID == item.id ? 'activeTag' : ''}`} key={index}>
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TagList;
