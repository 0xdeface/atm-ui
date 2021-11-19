const shiftIsOpen = 0
const shiftIsClose = 1
const shiftIsExpired = 2
const shiftStates = {
    0: {status: shiftIsOpen, text: "открыта", button: "закрыть"},
    1: {status: shiftIsClose, text: "закрыта", button: "открыть"},
    2: {status: shiftIsExpired, text: "истекла", button: "закрыть"},
}

export {shiftStates, shiftIsOpen, shiftIsClose, shiftIsExpired}
