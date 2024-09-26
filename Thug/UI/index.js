function dragElement(element, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.style.cursor = 'move';
    header.onmousedown = dragMouseDown;

    function dragMouseDown (e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

let menu = document.createElement('div');
menu.id = "UTC-Menu";
menu.style.position = 'fixed';
menu.style.top = "100px"; // Starting position
menu.style.left = "100px"; // Starting position
menu.style.zIndex = '99999';
menu.style.backgroundColor = 'rgba(36, 36, 36, 0.9)';
menu.style.color = "white";
menu.style.backdropFilter = 'blur(4px)';
menu.style.boxShadow = "0 8px 24px #0000004d";
menu.style.padding = '15px';
menu.style.borderRadius = '8px';
menu.style.width = '350px';
menu.style.height = "60%";

let header = document.createElement("h1");
header.id = "UTC-Header";
header.innerText = `UTC ThugBomber`;
header.style.cssText = "font-size: 35px; font-weight: bold; margin: 0; ";

menu.append(header);
document.body.appendChild(menu);

function addButton(name, callback) {
    let button = document.createElement('button');
    button.innerHTML = name;
    button.style.padding = '2px 15px';
    button.style.marginTop = "5px";
    button.style.backgroundColor = 'rgba(52, 52, 52, 1)';
    button.style.width = "100%";
    button.style.height = "5%";
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '14px';
    button.style.transition = 'background-color 0.3s, transform 0.3s';
    
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = 'rgba(75, 75, 75, 1)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'rgba(52, 52, 52, 1)';
    });
    
    button.addEventListener('click', function () {
        if (typeof thugCore !== 'undefined') {
            thugCore.check();
        }
        callback();
    });
    
    menu.appendChild(button);
    return button;
}

function addSlider(min, max, value, callback) {
    let sliderInput = document.createElement('input');
    sliderInput.type = 'range';
    sliderInput.min = min;
    sliderInput.max = max;
    sliderInput.value = value;
    sliderInput.style.flexGrow = '1';
    sliderInput.style.height = '5%';
    sliderInput.style.width = '100%';
    sliderInput.style.marginBottom = '5px';
    sliderInput.style.appearance = 'none';
    sliderInput.style.background = 'transparent';
    sliderInput.style.border = 'none';
    sliderInput.style.cursor = 'pointer';
    sliderInput.style.borderRadius = '5px';
    sliderInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    sliderInput.style.transition = 'background-color 0.3s ease';
    menu.appendChild(sliderInput);

    sliderInput.addEventListener('input', function () {
        if (typeof thugCore !== 'undefined') {
            thugCore.check();
        }
        callback();
    });
    
    return sliderInput;
}

export default { menu, addButton, addSlider, header, dragElement };