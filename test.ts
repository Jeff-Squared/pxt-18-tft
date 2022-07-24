TFT.init()
TFT.clearScreen(Color.Black)
TFT.drawPixel(0, 0, Color.White)
TFT.drawPixel(159, 0, Color.White)
TFT.drawPixel(0, 127, Color.White)
TFT.drawPixel(159, 127, Color.White)
TFT.drawHorizontal(0, 45, 160, Color.Red)
TFT.drawVertical(80, 70, 40, Color.Magenta)
TFT.drawRectangle(50, 5, 30, 30, Color.Yellow)
TFT.drawString(
"HELLO WORLD!",
20,
50,
Color.Cyan,
Color.Black
)
