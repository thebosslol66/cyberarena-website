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
     * Sign up new user.
     * Sign up new user with a username, an email and a password.
 *
 * The email must be valid and a mail will be send to confirm it.
 *
 * If the user is register correctly you will have a status code of 0.
 *
 * * 1: The username is not correct
 * * 2: The password is not correct
 * * 3: The email is not correct
 * * 4: The username is already used
 * * 5: The email is already used
 *
 * The name must do 4 char minimum and only containletters and numbers.
 *
 * The password must do 8 char minimum and contain at least one small letter, one capital letter and one number and one special character.
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
     * Activate user account.
     * Activate user account with the token send by email.
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
     * Get a token from login credentials.
     * Get a token from login credentials.
 *
 * If the credentials are not correct return 400 http error with the description of error.
 *
 * For the moment, if the user is inactive, it return error 400 too.
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
     * Get a new access token with a refresh token.
     * Get a new access token with a refresh token.
 *
 * The refresh token must be valid and not expired.
 *
 * If the same refresh token is used twice, it invalid all refresh token.
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
