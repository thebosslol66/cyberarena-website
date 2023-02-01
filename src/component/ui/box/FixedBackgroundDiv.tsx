import React from 'react'
import './FixedBackgroundDiv.css'
export class FixedBackgroundDivVideo extends React.Component<{ src: string, poster: string | undefined }> {
    render (): JSX.Element {
        return (
            <div className='div-background-clip'>
                <video
                    autoPlay
                    loop
                    muted
                    disablePictureInPicture
                    className='fixed-background-div-video'
                    poster={this.props.poster}
                >
                    <source src={this.props.src} type='video/webm'/>
                </video>
            </div>
        )
    }
}

export class FixedBackgroundDivImage extends React.Component<{ src: string, children: JSX.Element | JSX.Element[] }> {
    render (): JSX.Element {
        return (
            <div style={{
                background: `url(${this.props.src}) no-repeat center center fixed`
            }}
            className='fixed-background-div-image'>
                {this.props.children}
            </div>
        )
    }
}
