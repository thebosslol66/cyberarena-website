import React from 'react'
import { Image, Placeholder } from 'semantic-ui-react'
import { ProfileService } from '../../../client'

export default class MyAvatar extends React.Component {
    state = { loading: true, avatar: '' }

    componentDidMount (): void {
        this.getAvatar()
    }

    getAvatar = (): void => {
        void ProfileService.getCurrentUserAvatarApiProfileMeAvatarGet().then((response: ArrayBuffer) => {
            const blob = new Blob([response], { type: 'image/jpeg' })
            const url = URL.createObjectURL(blob)
            this.setState({ avatar: url, loading: false })
        })
    }

    render (): JSX.Element {
        return (
            <>
                {this.state.loading
                    ? (
                        <Placeholder fluid>
                            <Placeholder.Image square />
                        </Placeholder>
                    )
                    : (
                        <Image src={this.state.avatar} alt="avatar" width={256} height={256} wrapped ui={false}>

                        </Image>
                    )
                }
            </>
        )
    }
}
