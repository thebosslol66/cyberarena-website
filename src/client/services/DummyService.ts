/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {DummyModelDTO} from '../models/DummyModelDTO';
import type {DummyModelInputDTO} from '../models/DummyModelInputDTO';

import type {CancelablePromise} from '../core/CancelablePromise';
import {OpenAPI} from '../core/OpenAPI';
import {request as __request} from '../core/request';

export class DummyService {

    /**
     * Get Dummy Models
     * Retrieve all dummy objects from the database.
     *
     * :param limit: limit of dummy objects, defaults to 10.
     * :param offset: offset of dummy objects, defaults to 0.
     * :param dummy_dao: DAO for dummy models.
     * :return: list of dummy obbjects from database.
     * @param limit
     * @param offset
     * @returns DummyModelDTO Successful Response
     * @throws ApiError
     */
    public static getDummyModelsApiDummyGet(
        limit: number = 10,
        offset?: number,
    ): CancelablePromise<Array<DummyModelDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dummy/',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Dummy Model
     * Creates dummy model in the database.
     *
     * :param new_dummy_object: new dummy model item.
     * :param dummy_dao: DAO for dummy models.
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createDummyModelApiDummyPut(
        requestBody: DummyModelInputDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/dummy/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
