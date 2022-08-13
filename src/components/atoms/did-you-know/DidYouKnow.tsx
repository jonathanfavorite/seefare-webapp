import React, { useEffect } from "react";
import { DYK, GetRandomDidKnow } from "../../../helpers/DidYouKnowList";

function DidYouKnow() {
    const [didYouKnow, setDidYouKnow] = React.useState<DYK>();
    
    useEffect(() => {
        setDidYouKnow(GetRandomDidKnow());
    }, []);

    return (
        <div id="didyouknow-wrap">
            <div id="content">
                <div id="title">{didYouKnow?.title}</div>
                <div id="description">
                   {didYouKnow?.text}
                </div>
            </div>
        </div>
    );
}

export default DidYouKnow;
