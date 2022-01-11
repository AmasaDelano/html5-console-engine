
var game = html5console.init("game", {
    allowEmptyInput: false, // false by default. If given, players will be allowed to hit Enter with no text typed in.
    defaultInputHandler: null // Expects a function, null by default. If given, will be called when "read" is called without a function.
});

game.log("Hello World!");

game.read(function (input) {
    if (input === "Hello World!") {
        game.log("Hello! Happy to see you.");
    } else {
        game.log("\"" + input + "\" to you too!");
    }
});
