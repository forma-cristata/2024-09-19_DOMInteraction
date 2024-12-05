import * as Converters from './converters.mjs';

const ConversionOptionsConstant = ['Celsius', 'Fahrenheit', 'Kelvin'];
const input0 = document.getElementById('inputField0');
const input1 = document.getElementById('inputField1');
let ConversionOptions = new Array(ConversionOptionsConstant.length)
let i = 0;
const MetricPrefixesNegative = ["micro-byte", "milli-byte", "centi-byte", "deci-byte"];
                                       // -6                -3           -2            -1
const MetricPrefixesPositive = [ "byte", "deca-byte", "hecto-byte", "kilo-byte", "mega-byte"];
                                       //    0          1            2             3             6
const allMetricPrefixes = [...MetricPrefixesNegative, ...MetricPrefixesPositive];
const allMetricPrefixesExponents = [-6, -3, -2, -1, 0, 1, 2, 3, 6];

document.addEventListener("DOMContentLoaded", () =>
{
    let select0 = document.getElementById('Conversions');
    let select1 = document.getElementById('Conversions2');

    Converters.SelectorOptionsAvailable(select0, select1, ConversionOptionsConstant);
    Converters.SelectorOptionsAvailable(select1, select0, ConversionOptionsConstant);

    select0.placeholder = select0.value = "Unit";
    select1.placeholder = select1.value = "Unit";

    select0.addEventListener('input', () =>
    {
        for(let i = 0; i < ConversionOptionsConstant.length; i++)
        {
            ConversionOptions[i] = ConversionOptionsConstant[i];
        }
        if (select0.value !== "Unit") {
            // If it has options....
            // Show them (eliminate one of them)
            select0.id = select0.value;

            let x = ConversionOptions.indexOf(select0.value);
            ConversionOptions.splice(x, 1);

            Converters.SelectorOptionsAvailable(select1, select0, ConversionOptions);
            select1.id = select1.value;
            Converters.SetDefaults([select0, select1],[input0, input1]);
        }

        if(!isNaN(input0.value))
        {
            input1.value = Converters.Conversion(input0, select0.value, select1.value);
        }
        else
        {
            input0.value = Converters.Conversion(input1, select0.value, select1.value);
        }
    });

    select1.addEventListener('input', () =>
    {
        i++;
        for(let i = 0; i < ConversionOptionsConstant.length; i++)
        {
            ConversionOptions[i] = ConversionOptionsConstant[i];
        }
        if (select1.value !== "Unit") {
            // If it has options....
            // Show them (eliminate one of them)
            select1.id = select1.value.t;

            let x = ConversionOptions.indexOf(select1.value);
            ConversionOptions.splice(x, 1);

            Converters.SelectorOptionsAvailable(select0, select1, ConversionOptions);
            select0.id = select0.value;
            Converters.SetDefaults([select0, select1],[input0, input1]);
        }
        if(!isNaN(Number(input0.value)))
        {
            input1.value = Converters.Conversion(input0, select0.value, select1.value);
        }
        else
        {
            input0.value = Converters.Conversion(input1, select0.value, select1.value);
        }
    });

    document.querySelectorAll('body input').border = '2px solid white';

    input0.addEventListener('focus', () =>
    {
       Converters.FocusResult(input1);
    });

    input0.addEventListener('blur', () =>
    {
        // When user navigates away from element, reset.
        switch(Converters.AllowUnitChanges(select0, select1))
        {
            case 1:
                Converters.EmptyInputFields([input0, input1]);
                break;
            // When user navigates away from input, but not into the selections...
            case 2:
                input1.value = Converters.Conversion(input0.value, select0.value, select1.value);
                break;
        }
    });

    input0.addEventListener('click', () =>
    {
        input1.value = Converters.Conversion(input0, select0.value, select1.value);
    });

    input0.addEventListener('keyup', () => {
        // When user types into element, calculate.
        input1.value = Converters.Conversion(input0, select0.value, select1.value);
    });

    input1.addEventListener('focus', () =>
    {
        Converters.FocusResult(input0);
    });

    input1.addEventListener('blur', () =>
    {
        switch(Converters.AllowUnitChanges(select0, select1))
        {
            case 2:
                Converters.EmptyInputFields([input0, input1]);
                break;
            // When user navigates away from input, but not into the selections...
            case 1:
                input1.value = Converters.Conversion(input0.value, select0.value, select1.value);
                break;
        }
    });

    input1.addEventListener('click', () =>
    {
        input0.value = Converters.Conversion(input1, select1.value, select0.value);
    });

    input1.addEventListener('keyup', () =>
    {
        // When user types into element, calculate.
        input0.value = Converters.Conversion(input1, select0.value, select1.value);
    });




    let selectionOptions = [];
    let selectionOptions2 = [];
    const currentValueSelector = document.getElementById("byte-conversions-current");
    const desiredValueSelector = document.getElementById("byte-conversions-desired");
    Converters.SelectorOptionsAvailable(currentValueSelector, desiredValueSelector, allMetricPrefixes);
    Converters.SelectorOptionsAvailable(desiredValueSelector, currentValueSelector, allMetricPrefixes);

    currentValueSelector.addEventListener('input', () =>
    {
        for(let i = 0; i < allMetricPrefixes.length; i++)
        {
            selectionOptions[i] = allMetricPrefixes[i];
        }
        if (currentValueSelector.value !== "Unit") {
            // If it has options....
            // Show them (eliminate one of them)
            currentValueSelector.id = currentValueSelector.value;

            let x = selectionOptions.indexOf(currentValueSelector.value);
            selectionOptions.splice(x, 1);

            Converters.SelectorOptionsAvailable(desiredValueSelector, currentValueSelector, selectionOptions);
            desiredValueSelector.id = desiredValueSelector.value;
        }
        if(desiredValueSelector.value)
        {
            // how many combos of 8 individual, unique cards
            let currentExponent = allMetricPrefixes.indexOf(currentValueSelector.id);
            let desiredExponent = allMetricPrefixes.indexOf(desiredValueSelector.id);

            if(currentValueSelector.value && desiredValueSelector.value)
            {
                currentExponent = allMetricPrefixesExponents[currentExponent];
                desiredExponent = allMetricPrefixesExponents[desiredExponent];

                let result = inputValue.value * (10**currentExponent) / (10**desiredExponent);

                outputResultTag.innerText = `${outputResultTag.value} ${result}`;
            }
        }
    });
    desiredValueSelector.addEventListener('input', () =>
    {
        for(let i = 0; i < allMetricPrefixes.length; i++)
        {
            selectionOptions2[i] = allMetricPrefixes[i];
        }
        if (desiredValueSelector.value) {
            // If it has options....
            // Show them (eliminate one of them)
            desiredValueSelector.id = desiredValueSelector.value;

            let x = selectionOptions2.indexOf(desiredValueSelector.value);
            selectionOptions2.splice(x, 1);

            Converters.SelectorOptionsAvailable(currentValueSelector, desiredValueSelector, selectionOptions2);
            currentValueSelector.id = currentValueSelector.value;
        }

        if(currentValueSelector.value)
        {
            // how many combos of 8 individual, unique cards
            let currentExponent = allMetricPrefixes.indexOf(currentValueSelector.id);
            let desiredExponent = allMetricPrefixes.indexOf(desiredValueSelector.id);

            if(currentValueSelector.value && desiredValueSelector.value)
            {
                currentExponent = allMetricPrefixesExponents[currentExponent];
                desiredExponent = allMetricPrefixesExponents[desiredExponent];

                let result = inputValue.value * (10**currentExponent) / (10**desiredExponent);

                outputResultTag.innerText = `${outputResultTag.value} ${result}`;
            }
        }

    });

    const outputResultTag = document.getElementById("result-conversions-2");
    const inputValue = document.getElementById("input-current-value");

    inputValue.addEventListener('keyup', () =>
    {
       // how many combos of 8 individual, unique cards
        let currentExponent = allMetricPrefixes.indexOf(currentValueSelector.id);
        let desiredExponent = allMetricPrefixes.indexOf(desiredValueSelector.id);

        if(currentValueSelector.value && desiredValueSelector.value)
        {
            currentExponent = allMetricPrefixesExponents[currentExponent];
            desiredExponent = allMetricPrefixesExponents[desiredExponent];

            let result = inputValue.value * (10**currentExponent) / (10**desiredExponent);

            outputResultTag.innerText = `${outputResultTag.value} ${result}`;
        }


    });














});