import { SemanticCOLORS } from 'semantic-ui-react'

interface SignInterface {
    color?: SemanticCOLORS
    signInAndUpSamePage?: boolean
}

const defaultSignValues: SignInterface = {
    color: 'teal',
    signInAndUpSamePage: false
}

export { defaultSignValues }
export type { SignInterface }
