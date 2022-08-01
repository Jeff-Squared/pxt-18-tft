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
* TFT
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
        PWRSAV = 0xF6,
        VSCRDEF = 0x33,
        VSCRSADD = 0x37
    }

    let font1: number[] = [
        0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x5F, 0x00, 0x00,
        0x00, 0x07, 0x00, 0x07, 0x00,
        0x14, 0x7F, 0x14, 0x7F, 0x14,
        0x24, 0x2A, 0x7F, 0x2A, 0x12,
        0x23, 0x13, 0x08, 0x64, 0x62,
        0x36, 0x49, 0x56, 0x20, 0x50,
        0x00, 0x08, 0x07, 0x03, 0x00,
        0x00, 0x1C, 0x22, 0x41, 0x00,
        0x00, 0x41, 0x22, 0x1C, 0x00,
        0x2A, 0x1C, 0x7F, 0x1C, 0x2A,
        0x08, 0x08, 0x3E, 0x08, 0x08,
        0x00, 0x80, 0x70, 0x30, 0x00,
        0x08, 0x08, 0x08, 0x08, 0x08,
        0x00, 0x00, 0x60, 0x60, 0x00,
        0x20, 0x10, 0x08, 0x04, 0x02,
        0x3E, 0x51, 0x49, 0x45, 0x3E,
        0x00, 0x42, 0x7F, 0x40, 0x00,
        0x72, 0x49, 0x49, 0x49, 0x46,
        0x21, 0x41, 0x49, 0x4D, 0x33,
        0x18, 0x14, 0x12, 0x7F, 0x10,
        0x27, 0x45, 0x45, 0x45, 0x39,
        0x3C, 0x4A, 0x49, 0x49, 0x31,
        0x41, 0x21, 0x11, 0x09, 0x07,
        0x36, 0x49, 0x49, 0x49, 0x36,
        0x46, 0x49, 0x49, 0x29, 0x1E,
        0x00, 0x00, 0x14, 0x00, 0x00,
        0x00, 0x40, 0x34, 0x00, 0x00,
        0x00, 0x08, 0x14, 0x22, 0x41,
        0x14, 0x14, 0x14, 0x14, 0x14,
        0x00, 0x41, 0x22, 0x14, 0x08,
        0x02, 0x01, 0x59, 0x09, 0x06,
        0x3E, 0x41, 0x5D, 0x59, 0x4E,
        0x7C, 0x12, 0x11, 0x12, 0x7C,
        0x7F, 0x49, 0x49, 0x49, 0x36,
        0x3E, 0x41, 0x41, 0x41, 0x22,
        0x7F, 0x41, 0x41, 0x41, 0x3E,
        0x7F, 0x49, 0x49, 0x49, 0x41,
        0x7F, 0x09, 0x09, 0x09, 0x01,
        0x3E, 0x41, 0x41, 0x51, 0x73,
        0x7F, 0x08, 0x08, 0x08, 0x7F,
        0x00, 0x41, 0x7F, 0x41, 0x00,
        0x20, 0x40, 0x41, 0x3F, 0x01,
        0x7F, 0x08, 0x14, 0x22, 0x41,
        0x7F, 0x40, 0x40, 0x40, 0x40,
        0x7F, 0x02, 0x1C, 0x02, 0x7F,
        0x7F, 0x04, 0x08, 0x10, 0x7F,
        0x3E, 0x41, 0x41, 0x41, 0x3E,
        0x7F, 0x09, 0x09, 0x09, 0x06,
        0x3E, 0x41, 0x51, 0x21, 0x5E,
        0x7F, 0x09, 0x19, 0x29, 0x46
    ]
    let font2: number[] = [
        0x26, 0x49, 0x49, 0x49, 0x32,
        0x03, 0x01, 0x7F, 0x01, 0x03,
        0x3F, 0x40, 0x40, 0x40, 0x3F,
        0x1F, 0x20, 0x40, 0x20, 0x1F,
        0x3F, 0x40, 0x38, 0x40, 0x3F,
        0x63, 0x14, 0x08, 0x14, 0x63,
        0x03, 0x04, 0x78, 0x04, 0x03,
        0x61, 0x59, 0x49, 0x4D, 0x43,
        0x00, 0x7F, 0x41, 0x41, 0x41,
        0x02, 0x04, 0x08, 0x10, 0x20,
        0x00, 0x41, 0x41, 0x41, 0x7F,
        0x04, 0x02, 0x01, 0x02, 0x04,
        0x40, 0x40, 0x40, 0x40, 0x40,
        0x00, 0x03, 0x07, 0x08, 0x00,
        0x20, 0x54, 0x54, 0x78, 0x40,
        0x7F, 0x28, 0x44, 0x44, 0x38,
        0x38, 0x44, 0x44, 0x44, 0x28,
        0x38, 0x44, 0x44, 0x28, 0x7F,
        0x38, 0x54, 0x54, 0x54, 0x18,
        0x00, 0x08, 0x7E, 0x09, 0x02,
        0x18, 0xA4, 0xA4, 0x9C, 0x78,
        0x7F, 0x08, 0x04, 0x04, 0x78,
        0x00, 0x44, 0x7D, 0x40, 0x00,
        0x20, 0x40, 0x40, 0x3D, 0x00,
        0x7F, 0x10, 0x28, 0x44, 0x00,
        0x00, 0x41, 0x7F, 0x40, 0x00,
        0x7C, 0x04, 0x78, 0x04, 0x78,
        0x7C, 0x08, 0x04, 0x04, 0x78,
        0x38, 0x44, 0x44, 0x44, 0x38,
        0xFC, 0x18, 0x24, 0x24, 0x18,
        0x18, 0x24, 0x24, 0x18, 0xFC,
        0x7C, 0x08, 0x04, 0x04, 0x08,
        0x48, 0x54, 0x54, 0x54, 0x24,
        0x04, 0x04, 0x3F, 0x44, 0x24,
        0x3C, 0x40, 0x40, 0x20, 0x7C,
        0x1C, 0x20, 0x40, 0x20, 0x1C,
        0x3C, 0x40, 0x30, 0x40, 0x3C,
        0x44, 0x28, 0x10, 0x28, 0x44,
        0x4C, 0x90, 0x90, 0x90, 0x7C,
        0x44, 0x64, 0x54, 0x4C, 0x44,
        0x00, 0x08, 0x36, 0x41, 0x00,
        0x00, 0x00, 0x77, 0x00, 0x00,
        0x00, 0x41, 0x36, 0x08, 0x00,
        0x02, 0x01, 0x02, 0x04, 0x02
    ]

    /*
    * Initial TFT setup
    */
    //% block="Initialize TFT"
    //% weight=100

    export function init(): void {
        // set SPI frequency
        pins.spiFrequency(16000000)

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

        exitDataMode()
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

    //% block="String at: x:%x|y:%y with text:%string color:%color bgcolor:%bgcolor size:%size"
    //% inlineInputMode=inline
    //% weight 60
    export function drawChar( x: number, y: number, text: string,color: Color, bgcolor: Color, size: number) {
        let line = 0
        for (let stringPos = 0; stringPos < text.length; stringPos++) {
            let charIndex = text.charCodeAt(stringPos)
            if ((x >= TFTWIDTH) || (y >= TFTHEIGHT))
                return;
            if (size < 1) size = 1;
            if ((charIndex < 32) || (charIndex > 126))
                charIndex = 63;
            for (let i = 0; i < 5; i++) {
                if (charIndex < 83)
                    line = font1[(charIndex - 32) * 5 + i];
                else
                    line = font2[(charIndex - 83) * 5 + i];
                for (let j = 0; j < 7; j++, line >>= 1) {
                    if (line & 0x01) {
                        if (size == 1) drawPixel(x + i, y + j, color);
                        else drawRectangle(x + (i * size), y + (j * size), size, size, color);
                    }
                    else if (bgcolor != color) {
                        if (size == 1) drawPixel(x + i, y + j, bgcolor);
                        else drawRectangle(x + i * size, y + j * size, size, size, bgcolor);
                    }
                }
            }
            x += (5 * size) + 2
        }
    }

    //% block="Scroll areas: left:%leftArea right:%rightArea and direction:%_scroll_direction"
    //% weight 45
    export function setScrollDefinition(leftArea: number, rightArea: number, _scroll_direction: number) {
        let scroll_height = 0;

        if (leftArea<1) {
            leftArea=1
        }
        
        if (rightArea<1) {
            rightArea=1
        }

        scroll_height = TFTHEIGHT - leftArea - rightArea;
        send(TFTCommands.VSCRDEF, [0x00, leftArea, 0x00, scroll_height, 0x00, rightArea]);

        if (_scroll_direction) {

            send(TFTCommands.MADCTL, [0xD0])  //D0 
        }
        else {
            send(TFTCommands.MADCTL, [0xC0])  //C0
        }
    }

    //% block="Scroll pixels:%_vsp"
    //% weight 40
    export function VerticalScroll(_vsp: number) {
        send(TFTCommands.VSCRSADD, [0x00, _vsp]);
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
