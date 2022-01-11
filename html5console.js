"use strict";

var html5console = (function () {

    /**
     * Run to initialize your console game. The returned object contains the "write" function, to output text to your game.
     * @param {string} elementId - The id of the root element of your game. Expects this element to contain a div element with class "console-output" and an input element with class "console-input".
     * @param {object} options - Object of options to configure your console game.
     */
    function init(elementId, options) {
        function getCorrectChildElement(rootElement, className, tagName) {
            var element = rootElement.getElementsByClassName(className);

            if (!element || element.length === 0) {
                console.error("Error in html5console init: Could not find element with class \"" + className + "\" in element \"" + elementId + "\".");
            } else if (element.length > 1) {
                console.error("Error in html5console init: Found more than one element with class \"" + className + "\" in element \"" + elementId + "\".");
            } else if (element[0].tagName !== tagName) {
                console.error("Error in html5console init: Element with class \"" + className + "\" in element \"" + elementId + "\" isn't expected tag \"" + tagName + "\".");
            } else {
                return element[0];
            }
            
            return null;
        }

        function log(text) {
            if (!text) {
                return;
            }

            var logEntry = text.replace("\n", "<br>");
            logEntry = "<p>> " + logEntry + "</p>";
            runningRecord += logEntry;

            output.innerHTML = runningRecord;

            input.focus();
            output.scrollTop = output.scrollHeight;
        }

        var inputHandler = null;

        function read(newInputHandler) {
            inputHandler = newInputHandler;
        }

        function handleInput(text) {
            log(text);

            if (typeof(inputHandler) === "function") {
                inputHandler(text);
            } else {
                options.defaultInputHandler(text);
            }
        }

        var runningRecord = "";

        var root = document.getElementById(elementId);

        var output = getCorrectChildElement(root, "console-output", "DIV")
        var input = getCorrectChildElement(root, "console-input",  "INPUT");

        input.addEventListener("keypress", function (event) {
            if (event.keyCode !== 13 || event.repeat === true) {
                return;
            }

            if (options && !options.allowEmptyInput && input.value === "") {
                return;
            }

            var entry = input.value;
            input.value = "";

            handleInput(entry);
        });

        input.focus();

        return {
            log: log,
            read: read
        };
    }

    return {
        init: init
    };
}())