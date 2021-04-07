function handleMathOperation(event) {
    if(event == null) {
        return;
    }

    var firstValue = getValueFromInputWithId("firstOperand");
    var secondValue = getValueFromInputWithId("secondOperand");

    if(isEmpty(firstValue) || isEmpty(secondValue)) {
        setOutput("One of the operand fields is empty! Please, fill it"); 
        return;
    }

    var firstNumber = Number(firstValue);
    var secondNumber = Number(secondValue);

    if(event == ":" && secondNumber === 0) {
        setOutput("Dividing by zero is fobridden!"); 
        return;
    }

    var result = calculateResultWith(event, firstNumber, secondNumber).toFixed(2);

    var output = firstNumber + " " + event + " " + secondNumber + " = " + result;

    console.log(output);
    setOutput(output); 
}

function getValueFromInputWithId(id) {
    return document.getElementById(id).value;
}

function isEmpty(value) {
    return value.length === 0;
}

function calculateResultWith(event, firstNumber, secondNumber) {
    var result;
    if(event === '+') {
        result = firstNumber + secondNumber;
    } else if (event === 'x') {
        result = firstNumber * secondNumber;
    } else {
        result = firstNumber / secondNumber;
    }

    return result;
}

function setOutput(output) {
    document.getElementById("result").value = output;
}

function clearAllFields() {
    clearFieldWithId("firstOperand");
    clearFieldWithId("secondOperand");
    clearFieldWithId("result");
}

function clearFieldWithId(id) {
    document.getElementById(id).value = "";
}

function isTypedKeyNumber(event) {
    var charCode = event.keyCode;
    
    // prevent typing any key except number keys, '-' key, and '.' key
    if (charCode > 31 && charCode != 45 && charCode != 46 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    var key = event.key;
    var value = document.getElementById(event.target.id).value;

    // prevent typing '-' anywhere except the most left side
    // prevent typing no more than one '-'
    if(key == "-" && !value.includes("-")) {
        document.getElementById(event.target.id).value = key + value;
        return false;
    } else if (key == "-" && value.includes("-")) {
        return false;
    }

    // prevent typing '.' if the input is empty
    if(key == "." && value == "") {
        return false;
    }

    // prevent typing second '.' if the input already contains one
    if(key == "." && value.includes(".")) {
        return false;
    }

    // prevent typing '.' if there is only '-' in the input
    if(key == "." && value.length == 1 && value.includes("-")) {
        return false;
    }

    // prevent typing second '0' is there is no '.'
    if(key == "0" && value.startsWith("0") && !value.includes(".")) {
        return false;
    }

    // prevent typing any other key than '.' if the input starts with '0' and
    // does not contain '.' yet
    if(key != "." && value.startsWith("0") && !value.includes(".")) {
        return false;
    }   

    return true;
}