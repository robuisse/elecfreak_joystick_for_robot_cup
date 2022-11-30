enum RadioMessage {
    message1 = 49434,
    reculer = 19224,
    avancer = 29696,
    stop = 61268,
    gauche = 43105,
    droite = 37890,
    fermer = 27351,
    ouvir = 5814,
    fermerPince = 8074,
    ouvrirPince = 62538,
    monter = 43056,
    descendre = 32859
}
function button () {
    buttonVal = pins.analogReadPin(AnalogPin.P2)
    if (buttonVal < 256) {
        item = 1
    } else if (buttonVal < 597) {
        item = 2
    } else if (buttonVal < 725) {
        item = 3
    } else if (buttonVal < 793) {
        item = 4
    } else if (buttonVal < 836) {
        item = 5
    } else if (buttonVal < 938) {
        item = 6
    } else {
        item = 0
    }
}
let item = 0
let buttonVal = 0
radio.setGroup(1)
basic.forever(function () {
    button()
    if (item) {
        if (item == 5) {
            radio.sendMessage(RadioMessage.stop)
        } else if (item == 2) {
            radio.sendMessage(RadioMessage.fermerPince)
        } else if (item == 4) {
            radio.sendMessage(RadioMessage.ouvrirPince)
        } else if (item == 1) {
            radio.sendMessage(RadioMessage.monter)
        } else if (item == 3) {
            radio.sendMessage(RadioMessage.descendre)
        }
        basic.showNumber(item)
    } else if (pins.analogReadPin(AnalogPin.P0) < 400) {
        radio.sendMessage(RadioMessage.gauche)
    } else if (pins.analogReadPin(AnalogPin.P0) > 600) {
        radio.sendMessage(RadioMessage.droite)
    } else if (pins.analogReadPin(AnalogPin.P1) < 400) {
        radio.sendMessage(RadioMessage.reculer)
    } else if (pins.analogReadPin(AnalogPin.P1) > 600) {
        radio.sendMessage(RadioMessage.avancer)
    } else if (pins.analogReadPin(AnalogPin.P1) > 400 && pins.analogReadPin(AnalogPin.P1) < 600) {
        radio.sendMessage(RadioMessage.stop)
    } else {
        basic.clearScreen()
    }
})
