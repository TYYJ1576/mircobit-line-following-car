namespace LineFollow {
    const board_address = 0x10

    export enum LightMode {
        BREATH,
        OFF
    }

    export enum MotorList {
        M1,
        M2
    }
    
    export enum MoveList {
        Forward,
        Backward
    }

    export enum ServoList {
        S0,
        S1,
        S2,
        S3,
        S4,
        S5,
        S6,
        S7
    }

    export enum ServoTypeList {
        _180,
        _270,
        _360
    }

    function setMotorSpeed(motor: MotorList, speed: number): void {
        let buf = pins.createBuffer(4);
        switch (motor) {
            case MotorList.M1:
                buf[0] = 0x01;
                buf[1] = 0x01;
                if (speed < 0) {
                    buf[1] = 0x02;
                    speed = speed * -1
                }
                buf[2] = speed;
                buf[3] = 0;
                pins.i2cWriteBuffer(board_address, buf);
                break;
            case MotorList.M2:
                buf[0] = 0x02;
                buf[1] = 0x01;
                if (speed < 0) {
                    buf[1] = 0x02;
                    speed = speed * -1
                }
                buf[2] = speed;
                buf[3] = 0;
                pins.i2cWriteBuffer(board_address, buf);
                break;
            default:
                break;
        }
    }

    function setAllMotor(m1speed: number, m2speed: number): void {
        setMotorSpeed(MotorList.M1, m1speed)
        setMotorSpeed(MotorList.M2, m2speed)
    }

    export function turnLeft(speed: number): void{
        setMotorSpeed(MotorList.M1, 0)
        setMotorSpeed(MotorList.M2, speed)
    }

    export function turnRight(speed: number): void {
        setMotorSpeed(MotorList.M1, speed)
        setMotorSpeed(MotorList.M2, 0)
    }

    export function goForward(speed: number): void {
        setMotorSpeed(MotorList.M1, speed)
        setMotorSpeed(MotorList.M2, speed)
    }

    export function goBackward(speed: number): void {
        setMotorSpeed(MotorList.M1, -(speed))
        setMotorSpeed(MotorList.M2, -(speed))
    }

}