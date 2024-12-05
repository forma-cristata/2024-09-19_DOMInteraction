export {Conversion, FocusResult, SelectorOptionsAvailable, SetDefaults, AllowUnitChanges, EmptyInputFields};
const unitsAbsZerosAndDefaultPlaceholders = {"Celsius": {zero : -273.15, default: 100},
    "Fahrenheit": {zero:-459.67, default: 212},
    "Kelvin": {zero:0, default: 373.15}};
const UNITS = ["Celsius", "Fahrenheit", "Kelvin"];
//const MESSAGE = `ABSOLUTE ZERO REACHED\nAbsolute zero represents the point where all molecular motion ceases, and is considered the lowest temperature attainable according to the laws of physics.\n\nFahrenheit: -459.67\u00b0F\nCelsius: $-273.15\u00b0C\nKelvin: 0K`;

function Conversion(targetElement, typeTargetElement, typeOtherElement) {
     let elVal = targetElement.value;
     if (elVal) {
        let initialNum = Number(targetElement.value); // TODO this is wrong.
        let otherElementNum = undefined;
        /*
        c = k - 273.15, c = ((f-32) * 5/9) * 100) / 100
        ((f-32) * 5/9) * 100) / 100 / 100 = k - 273.15
         */
        let CelKelConverter = (c, k) =>
        {
            if(c) {
                let ke = c + 273.15;
                return ke;} // Celsius to Kelvin
            return (k-273.15); // Kelvin to Celsius
        }
        let FarCelConverter = (f, c) =>
        {
            if(f) {return ((((f - 32) * 5 / 9) * 100) / 100).toFixed(2);} // Fahrenheit to Celsius
            return ((((c * 9 / 5) + 32) * 100) / 100).toFixed(2); // Celsius to Fahrenheit
        }

        let FarKelConverter = (f, k) =>
         {
             if(f) {
                 let otherVal = k;
                 let cels = FarCelConverter(f, otherVal);
                 let kelv = CelKelConverter(cels, otherVal);
                 return kelv;
             }
             else
             {
                 let otherVal = f;
                 let cels = CelKelConverter(otherVal, k);
                 let far = FarCelConverter(f, cels);
                 return far;
             }
         }

        //Target is before, other is return type.
         switch(typeTargetElement)
         {
             case UNITS[0]: // TargetElement = Celsius
                 switch(typeOtherElement) {
                     case UNITS[1]: // (Celsius -> Fahrenheit)
                         return FarCelConverter(otherElementNum, initialNum);
                     case UNITS[2]: // (Celsius -> Kelvin)
                         return CelKelConverter(otherElementNum, initialNum);
                     default:
                         return "";
                 }

             case UNITS[1]: // TargetElement = Fahrenheit
                 switch(typeOtherElement) {
                     case UNITS[2]: // (Fahrenheit -> Kelvin)
                         return FarKelConverter( initialNum, otherElementNum);
                     case UNITS[0]: // (Fahrenheit -> Celsius)
                         return FarCelConverter(initialNum, otherElementNum);
                     default:
                         return "";
                 }

             case UNITS[2]: // TargetElement = Kelvin
                 switch(typeOtherElement) {
                     case UNITS[1]: // (Kelvin -> Fahrenheit)
                         return FarKelConverter(otherElementNum, initialNum);
                     case UNITS[0]: // (Kelvin -> Celsius)
                         return CelKelConverter(otherElementNum, initialNum);
                     default:
                         return "";
                 }
             default:
                 return "";
         }
     }
     return "";
    }

function EmptyInputFields(inputFields)
{
    for(let element of inputFields)
    {
        element.value = "";
    }
}

function SetDefaults(selectionFields, inputFields)
{
    for(let i = 0; i < selectionFields.length; i++)
    {
        switch(selectionFields[i].value)
        {
            case UNITS[0]:
                inputFields[i].placeholder = unitsAbsZerosAndDefaultPlaceholders[UNITS[0]].default;
                break;
            case UNITS[1]:
                inputFields[i].placeholder = unitsAbsZerosAndDefaultPlaceholders[UNITS[1]].default;
                break;
            case UNITS[2]:
                inputFields[i].placeholder = unitsAbsZerosAndDefaultPlaceholders[UNITS[2]].default;
                break;
            default:
                inputFields[i].placeholder = "";
                break;
        }
    }
}

function FocusResult(result)
{
    let otherElement = result.id === 'inputField0' ? document.getElementById('inputField1') : document.getElementById('inputField0');

    result.style.border = '2px solid #0bf2ac';
    result.style.backgroundColor = '#262626';
    result.style.color = '#8374fc';

    if(otherElement) {
        otherElement.border = 'inherit';
        otherElement.style.backgroundColor = 'inherit';
        otherElement.style.color = 'inherit';
    }
}

function SelectorOptionsAvailable(element, otherElement, choices)
{
        let test = false;
        let testString = "";
        if(element.value)
        {
            test = true;
            testString = element.value;
        }
        let countOptions = element.querySelectorAll('option').length;
        for(let i =0; i < countOptions; i++)
        {
            element.querySelector('option').remove()
        }
        for(let i = 0; i < choices.length; i++)
        {
            let option = document.createElement('option');
            option.text = option.value = choices[i];
            element.options.add(option);
        }
        if(!test)
        {
            element.value = "";
        }
        else if(element.value !== otherElement.value)
        {
            element.value = testString;
        }
        //Debugging new choices.
        console.log(element.querySelectorAll('option'));
}

function AllowUnitChanges(select0, select1)
{
    select0.addEventListener('input', () =>
    {
        return 1; // Convert input0
    });
    select1.addEventListener('input', () =>
    {
        return 2; // Convert input1
    });
    return 0;
    // When user navigates away from element, if they clicked into the selection menu, don't reset
}


