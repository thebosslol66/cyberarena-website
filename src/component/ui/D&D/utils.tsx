
export const move: any = (state: any, source: any, destination: any) => {
    const srcListClone = [...state[source.droppableId]]
    const destListClone =
        source.droppableId === destination.droppableId
            ? srcListClone
            : [...state[destination.droppableId]]

    const [movedElement] = srcListClone.splice(source.index, 1)
    destListClone.splice(destination.index, 0, movedElement)

    return {
        [source.droppableId]: srcListClone,
        ...(source.droppableId === destination.droppableId
            ? {}
            : {
                [destination.droppableId]: destListClone
            })
    }
}

export const GAME_STATE = {
    READY: 'ready',
    PLAYING: 'playing',
    DONE: 'done'
}
