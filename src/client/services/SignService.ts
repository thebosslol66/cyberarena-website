/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AskNewTokenData } from '../models/AskNewTokenData';
import type { Body_login_for_access_token_api_sign_token_post } from '../models/Body_login_for_access_token_api_sign_token_post';
import type { SignUpData } from '../models/SignUpData';
import type { SignUpStatusDTO } from '../models/SignUpStatusDTO';
import type { Tokens } from '../models/Tokens';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SignService {

    /**
     * Sign Up
     * Sign up user.
 *
 * :param sign_up_data: data for sign up.
 * :param user_dao: user dao.
 * :return: status of sign up.
     * @param requestBody 
     * @returns SignUpStatusDTO Successful Response
     * @throws ApiError
     */
    public static signUpApiSignSignUpPost(
requestBody: SignUpData,
): CancelablePromise<SignUpStatusDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sign/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Set User Active
     * Activate user.
 *
 * :param username: name of user.
 * :param user_dao: user dao.
     * @param username 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static setUserActiveApiSignActivateGet(
username: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sign/activate',
            query: {
                'username': username,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login For Access Token
     * Send user credentials to get back access token and refresh token.
 *
 * :param form_data: data from form.
 * :param user_dao: user dao.
 * :return: tokens.
 * :raises HTTPException: if user is not active or credentials are wrong.
     * @param formData 
     * @returns Tokens Successful Response
     * @throws ApiError
     */
    public static loginForAccessTokenApiSignTokenPost(
formData: Body_login_for_access_token_api_sign_token_post,
): CancelablePromise<Tokens> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sign/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Refresh Token Endpoint
     * Refresh token endpoint.
 *
 * :param ask_new_tokens: data for refresh token.
 * :param user_dao: user dao.
 * :return: new tokens.
 * :raises HTTPException: if user is not active.
     * @param requestBody 
     * @returns Tokens Successful Response
     * @throws ApiError
     */
    public static refreshTokenEndpointApiSignRefreshTokenPost(
requestBody: AskNewTokenData,
): CancelablePromise<Tokens> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sign/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
