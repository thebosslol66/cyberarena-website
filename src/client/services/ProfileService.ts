/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_change_avatar_api_profile_change_avatar_put } from '../models/Body_change_avatar_api_profile_change_avatar_put';
import type { ChangeUserInformations } from '../models/ChangeUserInformations';
import type { UserInformations } from '../models/UserInformations';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfileService {

    /**
     * Change the password of the current user.
     * Change the password of the current user.
 *
 * If the password is not correct, you will have a status code of 400.
 *
 * The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number.
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changePasswordApiProfileChangePasswordPut(
requestBody: ChangeUserInformations,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/profile/change/password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change the email of the current user.
     * Change the email of the current user.
 *
 * If the password is not correct, you will have a status code of 400.
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changeEmailApiProfileChangeEmailPut(
requestBody: ChangeUserInformations,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/profile/change/email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change the username of the current user.
     * Change the username of the current user.
 *
 * If the password is not correct, you will have a status code of 400.
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changeUsernameApiProfileChangeUsernamePut(
requestBody: ChangeUserInformations,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/profile/change/username',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change the avatar of the current user.
     * Change the avatar of the current user.
 *
 * Need a jpeg image or png image.
 *
 * The image must be lower than 1000000 and maax avatarside of 512.
 *
 * Else if not correct return error 400.
     * @param formData 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changeAvatarApiProfileChangeAvatarPut(
formData: Body_change_avatar_api_profile_change_avatar_put,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/profile/change/avatar',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get user informations.
     * Get informations about current logged user.
     * @returns UserInformations Successful Response
     * @throws ApiError
     */
    public static getCurrentUserProfileApiProfileMeGet(): CancelablePromise<UserInformations> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/me',
        });
    }

    /**
     * Get informations of the user with username.
     * Get informations of the user with username.
 *
 * If the user is not found, you will have a status code of 404.
     * @param username 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getSpecifiedUserProfileApiProfileUsernameGet(
username: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/{username}',
            path: {
                'username': username,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get user's avatar.
     * Get user's avatar wich is logged in. It return it's avatar file,
 *
 * If the user has no avatar, return a default avatar.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCurrentUserAvatarApiProfileMeAvatarGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/me/avatar',
            responseType: 'arraybuffer',
        });
    }

    /**
     * Get user's avatar.
     * Get user's avatar with his username. It return it's avatar file,
 *
 * If the user has no avatar, return a default avatar.
     * @param username 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getSpecifiedUserAvatarApiProfileUsernameAvatarGet(
username: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/{username}/avatar',
            path: {
                'username': username,
            },
            errors: {
                422: `Validation Error`,
            },
            responseType: 'arraybuffer',
        });
    }

}
