import api from './api'
import API_URL from './api.endpoints.json'
import { TicketData } from './Interfaces/game'

const cancelTicket = async (ticketId: number): Promise<TicketData> => {
    return await api.get(API_URL.endpoint.ticketcancel + ticketId).then(
        (response) => {
            return response.data
        }
    )
}

const ticketStatus = async (ticketId: number): Promise<TicketData> => {
    return await api.get(API_URL.endpoint.ticketstatus + ticketId).then(
        (response) => {
            return response.data
        }
    )
}

const openTicket = async (): Promise<TicketData> => {
    return await api.get(API_URL.endpoint.ticketopen, {}).then(
        (response) => {
            return response.data
        }
    )
}

const setIdUser = (userID: number): void => {
    localStorage.setItem('userID', JSON.stringify(userID))
}

const removeIdUser = (): void => {
    localStorage.removeItem('userID')
}

const getUserID = (): number => {
    return JSON.parse(localStorage.getItem('userID') ?? '{}')
}

const setRoomID = (roomID: number): void => {
    localStorage.setItem('roomID', JSON.stringify(roomID))
}

const removeRoomID = (): void => {
    localStorage.removeItem('roomID')
}

const getRoomID = (): number => {
    return JSON.parse(localStorage.getItem('roomID') ?? '{}')
}

const GameService = {
    cancelTicket,
    ticketStatus,
    openTicket,
    setIdUser,
    removeIdUser,
    getUserID,
    setRoomID,
    removeRoomID,
    getRoomID
}

export default GameService
