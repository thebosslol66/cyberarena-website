/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {
    Body_change_avatar_api_profile_change_avatar_put
} from '../models/Body_change_avatar_api_profile_change_avatar_put';
import type {ChangeUserInformations} from '../models/ChangeUserInformations';
import type {UserInformations} from '../models/UserInformations';

import type {CancelablePromise} from '../core/CancelablePromise';
import {OpenAPI} from '../core/OpenAPI';
import {request as __request} from '../core/request';

export class ProfileService {

    /**
     * Change Password
     * Change user password.
     *
     * :param password_data: data for change password.
     * :param user: current user.
     * :param user_dao: user dao.
     * :raises HTTPException: if password is incorrect or new password is incorrect.
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
     * Change Email
     * Change user email.
     *
     * :param change_email_data: data for change email.
     * :param user: current user.
     * :param user_dao: user dao.
     * :raises HTTPException: if email is incorrect.
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
     * Change Username
     * Change user username.
     *
     * :param change_username_data: data for change username.
     * :param user: current user.
     * :param user_dao: user dao.
     * :raises HTTPException: if username is incorrect.
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
     * Change Avatar
     * Change the user avatar with the new pass in parameters.
     *
     * Maximum size of the image is 1MB and must do at maximum 512x512 pixels
     * Must verify that the image is a png or jpg and not contain any
     * malicious code or software
     *
     * :param avatar_img: the new avatar image.
     * :param user: current user.
     * :return: if the avatar image has been updated.
     * :raises HTTPException: if the image is not a png or jpg or if the image is too big
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
     * Get Current User Profile
     * Get current user profile.
     *
     * :param current_user: current user.
     * :return: current user profile.
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
     * Get Specified User Profile
     * Return informations about a specific user with his username.
     *
     * :param username: username of profile to get.
     * :param user_dao: user_dao.
     * :raises HTTPException: if the user is not found.
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
     * Get Current User Avatar
     * Get current user avatar.
     *
     * :param current_user: current user.
     * :return: current user avatar.
     * :raises HTTPException: if user is not logged.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCurrentUserAvatarApiProfileMeAvatarGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/me/avatar',
        });
    }

    /**
     * Get Specified User Avatar
     * Get the avatar image of a user.
     *
     * It's a PNG image with maximum size of 512x512 pixels.
     *
     * :param username: username of the user.
     * :param user_dao: user dao.
     * :return: the avatar image of the user.
     * :raises HTTPException: if the user does not exist.
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
        });
    }

}
