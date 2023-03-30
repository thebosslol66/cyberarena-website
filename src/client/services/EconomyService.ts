/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EconomyService {

    /**
     * Ask Daily Free Coins
     * Ask daily free coins to a valid user.
 *
 * Check if user has already claimed the daily free coins.
 * Warning: This function does not check if the user is valid.
 *
 * :param user: user to give daily free coins.
 * :return: amount of coins given.
     * @returns number Successful Response
     * @throws ApiError
     */
    public static askDailyFreeCoinsApiEconomyDailyRewardGet(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/economy/daily-reward',
        });
    }

}
