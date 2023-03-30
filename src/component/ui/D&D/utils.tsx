export const move: any = (state: any, source: any, destination: any, dropzoneId: string) => {
    const srcListClone = [...state[dropzoneId]]
    const destListClone =
        dropzoneId === destination.droppableId
            ? srcListClone
            : [...state[destination.droppableId]]

    const [movedElement] = srcListClone.splice(source.index, 1)
    destListClone.splice(destination.index, 0, movedElement)

    return {
        [dropzoneId]: srcListClone,
        ...(dropzoneId === destination.droppableId && {
            [destination.droppableId]: destListClone
        })
    }
}

export const GAME_STATE = {
    READY: 'ready',
    PLAYING: 'playing',
    DONE: 'done'
}
