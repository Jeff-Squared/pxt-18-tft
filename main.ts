/**
 * Colors
 */
enum Color {
    //% block="Black"
    Black = 0x0000,
    //% block="LightGrey"
    LightGrey = 0xC618,
    //% block="DarkGrey"
    DarkGrey = 0x7BEF,
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
    White = 0xFFFF,
    //% block="Orange"
    Orange = 0xFD20,
    //% block="Pink"
    Pink = 0xF81F
}

/**
  * RB-TFT1.8 Block 
  */
//% color="#669999" icon="\uf008" weight=120 block="1.8 TFT Display"
namespace TFT {
    // Display commands & constants
    let TFTWIDTH = 160
    let TFTHEIGHT = 128
    let FONT_WIDTH = 6
    let FONT_HEIGHT = 11
    let FONT_PIXEL_CNT = (FONT_WIDTH * FONT_HEIGHT) * 2

    /**
     * TFT Commands
     */
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

    /*
     * Initial TFT setup
     */
    //% block="Initialize TFT"
    //% weight=100
    export function init(): void {
        // set SPI frequency
        pins.spiFrequency(5000000)

        //Toggle reset
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P8, 0)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P8, 1)

        // Frame rate control - normal mode
        send(TFTCommands.FRMCTR1, [0x01, 0x2C, 0x2D])

        // Frame rate control - idle mode
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
    //% weight=90
    export function clearScreen(color: Color = 0): void {
        drawRectangle(0, 0, TFTWIDTH + 2, TFTHEIGHT + 2, color)
    }

    /*
    * Draw single pixel
    */
    //% block="Draw single pixel at x:%x|y:%y with color:%color"
    //% x.min=1 x.max=162
    //% y.min=1 y.max=130
    //% weight=80
    export function drawPixel(x: number, y: number, color: Color): void {
        setWindow(x, y, x + 1, y + 1)
        send(TFTCommands.RAMWR, [color >> 8, color])
    }

    /*
     * Send command to display
     */
    function send(command: TFTCommands, parameter: Array<number>): void {
        // set TFT to command mode
        pins.digitalWritePin(DigitalPin.P12, 0)
        // select TFT controller
        pins.digitalWritePin(DigitalPin.P16, 0)
        // Send command
        pins.spiWrite(command)
        // set TFT back to data mode
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
        x1 = (x1 - 1 & 0xFF) + 1
        y0 = (y0 & 0xFF) + 2
        y1 = (y1 - 1 & 0xFF) + 2
        send(TFTCommands.CASET, [0x00, x0, 0x00, x1])
        send(TFTCommands.RASET, [0x00, y0, 0x00, y1])
    }

    /*
     * Data-Mode to transfer data to TFT for further processing
     */
    function enterDataMode(): void {
        // Activate command mode
        pins.digitalWritePin(DigitalPin.P12, 0)
        // select TFT as SPI-target
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.spiWrite(TFTCommands.RAMWR)
        // Activate data mode
        pins.digitalWritePin(DigitalPin.P12, 1)
    }

    /*
     * Finish data-mode and set back to command-mode
     */
    function exitDataMode(): void {
        pins.digitalWritePin(DigitalPin.P16, 1) // de-elect the TFT as SPI target
        pins.digitalWritePin(DigitalPin.P12, 0) // command/data = command
    }

    /*
    * RamRead
    */
    export function ram_read(addr: number, read_cnt: number = 1) {
        let RD_Byte = []
        pins.digitalWritePin(DigitalPin.P2, 0)   //CS ram
        pins.spiWrite(0x3)
        pins.spiWrite((addr >> 16) & 0xFF)
        pins.spiWrite((addr >> 8) & 0xFF)
        pins.spiWrite(addr & 0xFF)
        for (let i=0;i<read_cnt;i++){
        RD_Byte.push(pins.spiWrite(0x0))}
        pins.digitalWritePin(DigitalPin.P2, 1) //remove ram CS
        return RD_Byte
         }
   
   

    /*
     * Draw rectangle with a given color
     */
    //% block="Draw rectangle at x:%x|y:%y with width:%width|height:%height|color:%color"
    //% x.min=1 x.max=130
    //% y.min=1 y.max=162
    //% inlineInputMode=inline
    //% weight=70
    export function drawRectangle(x: number, y: number, width: number, height: number, color: Color): void {
        // Convert color
        let hiColor = (color >> 8) % 256
        let loColor = color % 256

        setWindow(x, y, x + width - 1, y + height - 1)
        enterDataMode()

        // Draw rectangle
        for (let indexY = height; indexY > 0; indexY--) {
            for (let indexX = width; indexX > 0; indexX--) {
                pins.spiWrite(hiColor);
                pins.spiWrite(loColor);
            }
        }

        exitDataMode()
    }

    /*
     * Draw circle with a given radius
     */
    //% block="Draw circle at: x:%x|y:%y with radius:%r and color:%color"
    //% x.min=1 x.max=162
    //% y.min=1 y.max=130
    //% inlineInputMode=inline
    //% weight=60
    export function drawCircle(x: number, y: number, radius: number, color: Color): void {
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

   

    //% block="Draw Character at: x0:%x0|y0:%y0 with char:%char"
    //% weight=50
    export function drawChar(x_0:number, y_0:number, text:string):void{
        let list = []
        
        let ch = text.charCodeAt(0) - 32
        let offset = ch * FONT_PIXEL_CNT
     
        list = TFT.ram_read(offset, FONT_PIXEL_CNT)
        setWindow(x_0, y_0, x_0 + FONT_WIDTH, y_0 + FONT_HEIGHT)
        send(TFTCommands.RAMWR, list)
        list.splice(0, list.length)
    }

    //% block="Draw Image at: x0:%x0|y0:%y0|x1:%x1|y1:%y1"
    //% inlineInputMode=inline
    //% weight=40
    export function drawImage(x0:number,y0:number,x1:number,y1:number): void {
       
        let list = []
        let width = (x1-x0) * 2
        let height=y1-y0
        let address = 0

        for (let i = 0; i < height; i++) {
            setWindow(x0,y0+i,x1,y0+i)
            list = TFT.ram_read(address, width)
            send(TFTCommands.RAMWR, list)
            list.splice(0, list.length)
            address+=width
        }
    
    }

}