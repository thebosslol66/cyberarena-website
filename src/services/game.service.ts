import api from './api'
import API_URL from './api.endpoints.json'
import {TicketData} from "./Interfaces/game";

const cancel_ticket = async (ticket_id: string): Promise<TicketData> => {
    return await api.get(API_URL.endpoint.ticketcancel+ticket_id).then(
        (response) => {
            return response.data
        }
    )
}

const ticket_status = async (ticket_id: string): Promise<TicketData> => {
    return await api.get(API_URL.endpoint.ticketstatus+ticket_id).then(
        (response) => {
            return response.data
        }
    )
}

const open_ticket = async (): Promise<TicketData> => {
    return await api.get(API_URL.endpoint.ticketopen, {}).then(
        (response) => {
            return response.data
        }
    )
}

const GameService = {
    cancel_ticket,
    ticket_status,
    open_ticket
}

export default GameService