# ArduinoBlinker
A simple [NodeJS](https://nodejs.org/) application to control an LED connected to an [Arduino](https://www.arduino.cc/en).
This project is written in [TypeScript](https://typescriptlang.org/) and is configured with [ts-node](https://typestrong.org/ts-node/) to directly run the TypeScript files and uses the [johhny-five](http://johnny-five.io/) library.

## Prequisites
* Code editor/IDE ([Visual Studio Code](https://code.visualstudio.com/) recommended)
* [Arduino IDE](https://www.arduino.cc/en/software/)
* [Arduino board w/ wire to connect to device](https://www.arduino.cc/en/main/products)
* LED
* [NodeJS](https://nodejs.org)

## Steps
1) Connect the positive side of the LED (long side) to port 13 and the negative side (short side) to ground
2) Connect the Arduino to your device with the wire
3) Open up the Arduino IDE. Go to Tools > Board and Tools > Port to ensure the correct board and port is selected
4) Go to File > Examples > Firmata and select "StandardFirmataPlus"
5) Upload the code to the Arduino
6) Download the code zip file from the GitHub repository and unzip it
7) Open the unzipped folder in your code editor/IDE
8) Run `npm install` (or `yarn add` if you're using yarn) to install dependencies specified in package.json in either your editor/IDE's in-built terminal or navigate to the project folder on your device's terminal and then run the command
9) Run `npm run arduino` in either your editor/IDE's in-built terminal or device terminal

You should see something similiar to the following in the terminal:
```
1643260827430 Available COM3  
1643260827441 Connected COM3  
1643260829130 Repl Initialized  
``` 
as well as the LED blinking.

## Contributing
If you find any issues, security vulnerabilities or a have featureq requests, you can open a new [issue](https://github.com/r1zyn/ArduinoBlinker/issues/new/choose).
If you'd like to contribute, create a [fork](https://github.com/Ascendus/ArduinoBlinker/fork), apply your changes and then open a [pull request](https://github.com/r1zyn/ArduinoBlinker/compare).

## Help
Need help? Feel free to contact me on Discord (tncz) or via email (ascendus.dev@gmail.com).

## License
This project is licensed under the [CC0 1.0 Universal License.](LICENSE)
