/**
 *
 * @param trackId
 * @param name
 */
export const generateTrackItemIds = (trackId: string, name?: string) => {
    let itemId = `track-item-${trackId}`;

    if (name) {
        itemId += `-${name}`;
    }

    return itemId
};

/**
 *
 * @param date
 */
export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
};