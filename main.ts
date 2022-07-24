enum Color {
    //% block="Black"
    Black = 0x0000,
    //% block="LightGrey"
    LightGrey = 0xC618,
    //% block="Blue"
    Blue = 0x001F,
    //% block="Green"
    Green = 0x07E0,
    //% block="Cyan"
    Cyan = 0x07FF,
    //% block="Red"
    Red = 0xF800,
    //% block="Magenta"
    Magenta = 0xF81F,
    //% block="Yellow"
    Yellow = 0xFFE0,
    //% block="White"
    White = 0xFFFF
}

/**
* RB-TFT1.8 Block
*/
//% color="#669999" icon="\uf008" weight=110 block="1.8 TFT Display"

namespace TFT {

    let TFTWIDTH = 160
    let TFTHEIGHT = 128

    enum TFTCommands {
        NOP = 0x00,
        SWRESET = 0x01,
        SLPOUT = 0x11,
        NORON = 0x13,
        INVOFF = 0x20,
        DISPOFF = 0x28,
        DISPON = 0x29,
        CASET = 0x2A,
        RASET = 0x2B,
        RAMWR = 0x2C,
        MADCTL = 0x36,
        COLMOD = 0x3A,
        FRMCTR1 = 0xB1,
        FRMCTR2 = 0xB2,
        FRMCTR3 = 0xB3,
        INVCTR = 0xB4,
        PWCTR1 = 0xC0,
        PWCTR2 = 0xC1,
        PWCTR3 = 0xC2,
        PWCTR4 = 0xC3,
        PWCTR5 = 0xC4,
        VMCTR1 = 0xC5,
        GMCTRP1 = 0xE0,
        GMCTRN1 = 0xE1,
        DELAY = 0xFFFF,
        TEST = 0xF0,
        PWRSAV = 0xF6
    }

    /**
     * Unicode representation
     * The unicode table is split into seven parts because of memory size and array size limitations of the microbit
     */
    let fontOne: number[] = [0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
        0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
        0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422]
    let fontTwo: number[] = [0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
        0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x00000000, 0x000002e0,
        0x00018060, 0x00afabea, 0x00aed6ea, 0x01991133, 0x010556aa, 0x00000060]
    let fontThree: number[] = [0x000045c0, 0x00003a20, 0x00051140, 0x00023880, 0x00002200, 0x00021080,
        0x00000100, 0x00111110, 0x0007462e, 0x00087e40, 0x000956b9, 0x0005d629, 0x008fa54c, 0x009ad6b7,
        0x008ada88, 0x00119531, 0x00aad6aa, 0x0022b6a2, 0x00000140, 0x00002a00]
    let fontFour: number[] = [0x0008a880, 0x00052940, 0x00022a20, 0x0022d422, 0x00e4d62e, 0x000f14be,
        0x000556bf, 0x0008c62e, 0x0007463f, 0x0008d6bf, 0x000094bf, 0x00cac62e, 0x000f909f, 0x000047f1,
        0x0017c629, 0x0008a89f, 0x0008421f, 0x01f1105f, 0x01f4105f, 0x0007462e]
    let fontFive: number[] = [0x000114bf, 0x000b6526, 0x010514bf, 0x0004d6b2, 0x0010fc21, 0x0007c20f,
        0x00744107, 0x01f4111f, 0x000d909b, 0x00117041, 0x0008ceb9, 0x0008c7e0, 0x01041041, 0x000fc620,
        0x00010440, 0x01084210, 0x00000820, 0x010f4a4c, 0x0004529f, 0x00094a4c]
    let fontSix: number[] = [0x000fd288, 0x000956ae, 0x000097c4, 0x0007d6a2, 0x000c109f, 0x000003a0,
        0x0006c200, 0x0008289f, 0x000841e0, 0x01e1105e, 0x000e085e, 0x00064a4c, 0x0002295e, 0x000f2944,
        0x0001085c, 0x00012a90, 0x010a51e0, 0x010f420e, 0x00644106, 0x01e8221e]
    let fontSeven: number[] = [0x00093192, 0x00222292, 0x00095b52, 0x0008fc80, 0x000003e0, 0x000013f1,
        0x00841080, 0x0022d422];

    /*
    * Initial TFT setup
    */
    //% block="Initialize TFT"
    //% weight=100

    export function init(): void {
        // set SPI frequency
        pins.spiFrequency(5000000)

        //Toggle reset pin
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P8, 0)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P8, 1)

        // Frame rate control 
        send(TFTCommands.FRMCTR1, [0x01, 0x2C, 0x2D])
        send(TFTCommands.FRMCTR2, [0x01, 0x2C, 0x2D])
        send(TFTCommands.FRMCTR3, [0x01, 0x2C, 0x2D, 0x01, 0x2C, 0x2D])

        // Display inversion control
        send(TFTCommands.INVCTR, [0x07])

        // Display power control
        send(TFTCommands.PWCTR1, [0xA2, 0x02, 0x84])
        send(TFTCommands.PWCTR2, [0xC5])
        send(TFTCommands.PWCTR3, [0x0A, 0x00])
        send(TFTCommands.PWCTR4, [0x8A, 0x2A])
        send(TFTCommands.PWCTR5, [0x8A, 0xEE])
        send(TFTCommands.VMCTR1, [0x0E])

        // Set Gamma
        send(TFTCommands.GMCTRP1, [0x0F, 0x1A, 0x0F, 0x18, 0x2F, 0x28, 0x20, 0x22, 0x1F, 0x1B, 0x23, 0x37, 0x00, 0x07, 0x02, 0x10])
        send(TFTCommands.GMCTRN1, [0x0F, 0x1B, 0x0F, 0x17, 0x33, 0x2C, 0x29, 0x2E, 0x30, 0x30, 0x39, 0x3F, 0x00, 0x07, 0x03, 0x10])

        send(TFTCommands.TEST, [0x01])
        send(TFTCommands.PWRSAV, [0x00])
        send(TFTCommands.COLMOD, [0x05])
        send(TFTCommands.MADCTL, [0xA0])
        send(TFTCommands.SLPOUT, [])

        basic.pause(100)
        // Turn display on
        send(TFTCommands.DISPON, [])
    }

    //% block="Clear screen color: %color"
    //% weight=95

    export function clearScreen(color: Color = 0): void {
        drawRectangle(0, 0, TFTWIDTH + 2, TFTHEIGHT + 2, color)
    }

    /*
     * Draw single pixel
     */
    //% block="Draw single pixel at x:%x|y:%y with color:%color"
    //% x.min=0 x.max=159
    //% y.min=0 y.max=127
    //% weight=90

    export function drawPixel(x: number, y: number, color: Color): void {
        setWindow(x, y, x + 1, y + 1)
        send(TFTCommands.RAMWR, [color >> 8, color])
    }

    //% block="Draw horizontal line at x:%x|y:%y with length:%length and color:%color"
    //% inlineInputMode=inline
    //% weight=85

    export function drawHorizontal(x_0: number, y_0: number, length: number, color: Color): void {
        setWindow(x_0, y_0, x_0 + length, y_0)
        pins.digitalWritePin(DigitalPin.P12, 1) //EN LCD data
        pins.digitalWritePin(DigitalPin.P16, 0)  //EN LCD CS
        for (let i = 0; i < length; i++) {
            pins.spiWrite(color >> 8 & 0xFF)
            pins.spiWrite(color & 0xFF)
        }
        pins.digitalWritePin(DigitalPin.P16, 1)  //remove LCD CS
    }

    //% block="Draw vertical line at x:%x|y:%y with length:%length and color:%color"
    //% inlineInputMode=inline
    //% weight=80

    export function drawVertical(x_0: number, y_0: number, length: number, color: Color): void {
        setWindow(x_0, y_0, x_0 + 1, y_0 + length)
        pins.digitalWritePin(DigitalPin.P12, 1) //EN LCD data
        pins.digitalWritePin(DigitalPin.P16, 0)  //EN LCD CS
        for (let j = 0; j < length; j++) {
            pins.spiWrite(color >> 8 & 0xFF)
            pins.spiWrite(color & 0xFF)
        }
        pins.digitalWritePin(DigitalPin.P16, 1)  //remove LCD CS
    }

    /*
    * Draw rectangle with a given color
    */
    //% block="Draw rectangle at x:%x|y:%y with width:%width|height:%height|color:%color"
    //% x.min=0 x.max=159
    //% y.min=0 y.max=127
    //% inlineInputMode=inline
    //% weight=75

    export function drawRectangle(x_0: number, y_0: number, width: number, height: number, color: Color) {
        let x_1 = x_0 + width
        let y_1 = y_0 + height
        let count = width * height
        setWindow(x_0, y_0, x_1, y_1)

        enterDataMode()

        for (let k = 0; k < count; k++) {
            pins.spiWrite(color >> 8 & 0xFF)
            pins.spiWrite(color & 0xFF)
        }

        exitDataMode
    }

    /*
    * Draw a fill circle with a given radius
    */
    //% block="Draw fill circle at: x:%x|y:%y with radius:%r and color:%color"
    //% x.min=0 x.max=159
    //% y.min=0 y.max=127
    //% inlineInputMode=inline
    //% weight=70

    export function drawFillCircle(x: number, y: number, radius: number, color: Color): void {
        for (let y1 = -radius; y1 <= 0; y1++) {
            for (let x1 = -radius; x1 <= 0; x1++) {
                if ((x1 * x1 + y1 * y1) <= (radius * radius)) {
                    drawPixel(x + x1, y + y1, color)
                    drawPixel(x + x1, y - y1, color)
                    drawPixel(x - x1, y + y1, color)
                    drawPixel(x - x1, y - y1, color)
                }
            }
        }
    }

    /*
    * Draw circle with a given radius
    */
    //% block="Draw a circle at: x:%x|y:%y with radius:%r and color:%color"
    //% x.min=0 x.max=159
    //% y.min=0 y.max=127
    //% inlineInputMode=inline
    //% weight=65

    export function drawCircle(center_x: number, center_y: number, radius: number, color: Color): void {
        for (let l = 0; l < 360; l++) {
            let rads = degreesRadians(l)
            let x12 = center_x + Math.sin(rads) * radius
            let y12 = center_y - Math.cos(rads) * radius
            drawPixel(x12, y12, color)
        }
    }

    /*
    * Draw string
    */

    //% block="Draw string:%string at x:%x and y:%y with color:%color and background color:%bgcolor"
    //% weight 60
    
    export function drawString(text: string, x: number, y: number, color: Color, background: Color) {  //1
       
        let index = 0
        let unicode = 0
        let colsel = 0
        let charIndex = 0

        for (let stringPos = 0; stringPos < text.length; stringPos++) { //2
            charIndex = text.charCodeAt(stringPos)

            if (charIndex < 20) {
                unicode = fontOne[charIndex]
            }
            else if (charIndex < 40) {
                unicode = fontTwo[charIndex - 20]
            }
            else if (charIndex < 60) {
                unicode = fontThree[charIndex - 40]
            }
            else if (charIndex < 80) {
                unicode = fontFour[charIndex - 60]
            }
            else if (charIndex < 100) {
                unicode = fontFive[charIndex - 80]
            }
            else if (charIndex < 120) {
                unicode = fontSix[charIndex - 100]
            }
            else if (charIndex < 140) {
                unicode = fontSeven[charIndex - 120]
            }

            let spacing = stringPos * 11
            let xOffset = spacing + 10
            setWindow(x + spacing, y, x + xOffset, y + 10)
            enterDataMode()
            for (let indexY = 0; indexY < 5; indexY++) { //3

                for (let a = 0; a < 2; a++) {


                    for (let indexX = 0; indexX < 5; indexX++) { //4
                        index = indexY + indexX * 5
                        colsel = (unicode & (1 << index))

                        for (let b = 0; b < 2; b++) {
                            if (colsel) {
                                pins.spiWrite(color >> 8 & 0xFF)
                                pins.spiWrite(color & 0xFF)
                            }

                            else {
                                pins.spiWrite(background >> 8 & 0xFF)
                                pins.spiWrite(background & 0xFF)
                            }
                        }
                    }
                } 
            } 

            exitDataMode()
          
        }
    }
   
    /*
    * Send command to display
    */

    function send(command: TFTCommands, parameter: Array<number>): void {
        // set TFT to command-receive mode
        pins.digitalWritePin(DigitalPin.P12, 0)
        // select TFT controller
        pins.digitalWritePin(DigitalPin.P16, 0)
        // Send command
        pins.spiWrite(command)

        // set TFT back to data-receive mode
        pins.digitalWritePin(DigitalPin.P12, 1)

        for (let item of parameter) {
            pins.spiWrite(item)
        }

        // deselect TFT controller
        pins.digitalWritePin(DigitalPin.P16, 1)
    }

    /*
    * Set pixel address window - minimum and maximum pixel bounds
    */

    function setWindow(x0: number, y0: number, x1: number, y1: number): void {
        x0 = (x0 & 0xFF) + 1
        x1 = ((x1 - 1) & 0xFF) + 1
        y0 = (y0 & 0xFF) + 2
        y1 = ((y1 - 1) & 0xFF) + 2
        send(TFTCommands.CASET, [0x00, x0, 0x00, x1])
        send(TFTCommands.RASET, [0x00, y0, 0x00, y1])
        send(TFTCommands.RAMWR, [])
    }

    /*
    * Data-Mode to transfer data to TFT for further processing
    */
    function enterDataMode(): void {
        // Activate command mode
        pins.digitalWritePin(DigitalPin.P12, 0)
        // CS LCD
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.spiWrite(TFTCommands.RAMWR)
        // Activate data mode
        pins.digitalWritePin(DigitalPin.P12, 1)
    }

    /*
     * Finish data-mode and set back to command-mode
     */
    function exitDataMode(): void {
        pins.digitalWritePin(DigitalPin.P16, 1) // deselect LCD
        pins.digitalWritePin(DigitalPin.P12, 0) // command/data = command
    }

    /*
    * RamRead
    */
    function ram_read(addr: number, read_cnt: number = 1) {
        let RD_Byte = []
        pins.digitalWritePin(DigitalPin.P2, 0)   //CS ram
        pins.spiWrite(0x3)
        pins.spiWrite((addr >> 16) & 0xFF)
        pins.spiWrite((addr >> 8) & 0xFF)
        pins.spiWrite(addr & 0xFF)
        for (let m = 0; m < read_cnt; m++) {
            RD_Byte.push(pins.spiWrite(0x0))
        }
        pins.digitalWritePin(DigitalPin.P2, 1) //remove ram CS
        return RD_Byte
    }

    /*
    * Convert degress to radians
    */

    function degreesRadians(degrees: number) {
        let pi = Math.PI;
        return degrees * (pi / 180);
    }

}
