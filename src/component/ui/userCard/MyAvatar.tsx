/* tslint:disable */
/* eslint-disable */
import React from 'react'
import {Image} from "semantic-ui-react";
import UserService from "../../../services/user.service";

export default class MyAvatar extends React.Component {
    state = { loading: true, avatar: '' }

    componentDidMount () {
        this.getAvatar()
    }

    getAvatar = (): void => {
        UserService.getMyAvatar().then((res: Blob) => {
            URL.revokeObjectURL(this.state.avatar)
            this.setState({ avatar: URL.createObjectURL(res), loading: false })
        })

    }

    render () {
        return (
            <Image src={this.state.avatar} alt="avatar" width={256} height={256} fluid={true} >

            </Image>
        )
    }
}