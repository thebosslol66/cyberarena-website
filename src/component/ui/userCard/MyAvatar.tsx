/* tslint:disable */
/* eslint-disable */
import React from 'react'
import {Image} from "semantic-ui-react";
import {ProfileService} from "../../../client";

export default class MyAvatar extends React.Component {
    state = { loading: true, avatar: '' }

    componentDidMount () {
        this.getAvatar()
    }

    getAvatar = (): void => {
        ProfileService.getCurrentUserAvatarApiProfileMeAvatarGet().then((response: ArrayBuffer) => {
            const blob = new Blob([response], {type: 'image/jpeg'})
            const url = URL.createObjectURL(blob)
            this.setState({avatar: url})
        })
    }

    render () {
        return (
            <Image src={this.state.avatar} alt="avatar" width={256} height={256} fluid={true} >

            </Image>
        )
    }
}