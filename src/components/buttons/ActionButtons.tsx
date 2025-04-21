"use client";

import React from 'react';
import { Track } from "@/lib/client/apiTracks";
import CreateTrackButton from "@/components/buttons/CreateTrackButton";
import SelectionToggleButton from "@/components/buttons/SelectionToggleButton";
import SelectAllButton from "@/components/buttons/SelectAllButton";
import DeleteSelectedTracksButton from "@/components/buttons/DeleteSelectedTracksButton";

type ActionButtonsProps = {
    tracks?: Track[];
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ tracks }) => {
    return (
        <div className="flex justify-end space-x-2">
            <CreateTrackButton className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" />
            <SelectionToggleButton />
            {tracks && <SelectAllButton allTrackIds={tracks.map((track: Track) => track.id)} />}
            {tracks && (
                <DeleteSelectedTracksButton className="w-full sm:w-auto px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition duration-300" />
            )}
        </div>
    );
};

export default ActionButtons;
