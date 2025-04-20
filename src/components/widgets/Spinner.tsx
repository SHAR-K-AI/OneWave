import React from "react";

type SpinnerProps = {
    variant?: "tracks" | "loading-indicator";
};

/**
 *
 * @param variant
 * @constructor
 */
const Spinner: React.FC<SpinnerProps> = ({variant = "loading-indicator"}) => {
    return (
        /*TODO data-testid="loading-indicator" - Main loading indicator
            data-testid="loading-tracks" - Loading indicator for the tracks list*/
        <div className="cassette-loader" data-testid={variant} data-loading="true" aria-busy="true">
            <div className="reel left"/>
            <div className="tape"/>
            <div className="reel right"/>
        </div>
    );
};

export default Spinner;
