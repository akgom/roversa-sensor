//% color="#00A6ED" block="Roversa Sensor"
namespace roversaSensor {
    let trig = DigitalPin.P13
    let echo = DigitalPin.P14
    let stopDistance = 15

    //% block="set ultrasonic trig %trigPin echo %echoPin"
    export function setUltrasonicPins(trigPin: DigitalPin, echoPin: DigitalPin): void {
        trig = trigPin
        echo = echoPin
    }

    //% block="set stop distance to %cm cm"
    export function setStopDistance(cm: number): void {
        stopDistance = cm
    }

    //% block="distance in cm"
    export function distanceCm(): number {
        pins.digitalWritePin(trig, 0)
        control.waitMicros(2)

        pins.digitalWritePin(trig, 1)
        control.waitMicros(10)
        pins.digitalWritePin(trig, 0)

        let duration = pins.pulseIn(echo, PulseValue.High, 25000)
        return Math.idiv(duration, 58)
    }

    //% block="is obstacle too close"
    export function isObstacleTooClose(): boolean {
        return distanceCm() <= stopDistance
    }
}
