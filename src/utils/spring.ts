
export interface SpringConfig {
    mass?: number
    damping?: number
    stiffness?: number
}

interface SpringUpdateOpts {
    hard?: boolean
    soft?: number | boolean
}

export default class Spring {
    private value: number
    private readonly config: SpringConfig
    private time: number
    private goalValue: number
    private readonly precision: number
    private lastValue: number = 0
    private inv_mass_recovery_rate: number

    constructor (value: number, config?: SpringConfig) {
        this.lastValue = value
        this.value = value
        this.config = {
            mass: 1,
            damping: 0.5,
            stiffness: 0.5
        }
        if (config != null) {
            this.setConfig(config)
        }
        this.time = Date.now()

        this.precision = 0.001

        this.goalValue = value
        this.inv_mass_recovery_rate = 0
    }

    public getValue (): number {
        return this.value
    }

    public setValue (value: number): void {
        this.goalValue = value
    }

    public getLastTime (): number {
        return this.time
    }

    public setConfig (config: SpringConfig): void {
        this.config.mass = config.mass ?? this.config.mass
        this.config.damping = config.damping ?? this.config.damping
        this.config.stiffness = config.stiffness ?? this.config.stiffness
    }

    setConfigUpdate (opt: SpringUpdateOpts): void {
        if (opt.hard === true) {
            this.config.mass = 1
            this.inv_mass_recovery_rate = 0
            this.forceValue(this.goalValue)
        }
        if (opt.soft != null) {
            const rate = opt.soft === true ? 0.5 : +opt.soft
            this.inv_mass_recovery_rate = 1 / (rate * 60)
            this.config.mass = 0 // infinite mass, unaffected by spring forces)
        }
    }

    public forceValue (value: number): void {
        this.value = value
        this.goalValue = value
        this.lastValue = value
    }

    public resetTime (): void {
        this.time = Date.now()
    }

    getConfig (): SpringConfig {
        return this.config
    }

    public update (): number {
        if (this.goalValue === this.value) {
            return this.value
        }
        const dt = (Date.now() - this.time) * 60 / 1000
        if (dt < 0.005) {
            return this.value
        }

        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        this.config.mass = Math.min(this.inv_mass_recovery_rate + this.config.mass, 1)
        if (this.config.mass === 1) {
            this.inv_mass_recovery_rate = 0
        }

        this.time = Date.now()
        const { mass = 1, damping = 0.5, stiffness = 0.5 } = this.config
        const x = this.goalValue - this.value
        const v = (this.value - this.lastValue) / (dt ?? 1 / 60)
        const spring = stiffness * x
        const damper = damping * v
        const a = (spring - damper) * mass
        const d = (v + a) * dt
        this.lastValue = this.value
        this.value += d
        if (Math.abs(d) < Math.abs(this.precision) && Math.abs(x) < this.precision) {
            this.value = this.goalValue
        }
        return Math.round(this.value / this.precision) * this.precision
    }
}
