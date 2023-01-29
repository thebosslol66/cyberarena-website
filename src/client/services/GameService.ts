/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardModel } from '../models/CardModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GameService {

    /**
     * Get Card
     * Get a card.
 *
 * :param card_id: The id of the card to get
 * :return: The card
 * :raises HTTPException: If the card doesn't exist
     * @param cardId 
     * @returns CardModel Successful Response
     * @throws ApiError
     */
    public static getCardApiGameCardCardIdDataGet(
cardId: number,
): CancelablePromise<CardModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/card/{card_id}/data',
            path: {
                'card_id': cardId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Card Image
     * Get the image of a card.
 *
 * :param card_id: The id of the card to get the image
 * :return: The image of the card
     * @param cardId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCardImageApiGameCardCardIdImageGet(
cardId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/card/{card_id}/image',
            path: {
                'card_id': cardId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
