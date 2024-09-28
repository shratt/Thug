function Menu (name) {

    function createPanel (title) {
        const panel = document.createElement('div');
        panel.style.position = 'fixed';
        panel.style.width = '250px';
        panel.style.height = 'auto';
        panel.style.border = '1px solid #444';
        panel.style.backgroundColor = 'rgba(25, 25, 25, 0.75)';
        panel.style.backdropFilter = 'blur(4px)';
        panel.style.color = '#FFF';
        panel.style.padding = '10px';
        panel.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.5)';
        panel.style.borderRadius = '8px';
        panel.style.zIndex = '999999';
        panel.style.left = '100px';
        panel.style.top = '100px';
        panel.style.userSelect = "none";
        document.body.appendChild(panel);

        if (title) {
            panel.header = document.createElement('h2');
            panel.header.style.margin = '0';
            panel.header.style.textAlign = "center";
            panel.header.style.fontSize = "30px";
            panel.header.style.color = '#FFF';
            panel.header.textContent = title;
            panel.appendChild(panel.header);
        }

        return panel;
    }

    let panel = createPanel(name);

    panel.settingsOpen = false;

    Menu.addButton = function (targetMenu, title, toggle, enable, disable, enabled = false) {
        let defaultColor = 'rgba(55, 55, 55, 0.75)';
        let hoverColor = 'rgba(25, 25, 25, 0.85)';
        let toggledColor = 'rgba(10, 10, 10, 0.75)';
            
        const button = document.createElement('button');
        button.textContent = title;
        button.className = 'button';
        button.style.padding = '8px 12px';
        button.style.width = '100%';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.margin = '5px 0';
        button.style.color = 'white';
        button.style.transition = "background-color 100ms linear";

        let toggled = enabled;

        if (toggled) {
            button.style.backgroundColor = toggledColor;
        } else {
            button.style.backgroundColor = defaultColor;
        }


        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = hoverColor;
            button.style.outline = "1px solid #444";
        });

        button.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (toggled) {
                    button.style.backgroundColor = toggledColor; 
                } else {
                    button.style.backgroundColor = defaultColor; 
                }
                button.style.outline = "none";
            }, 100);
        });

        button.addEventListener('click', () => {
            if (toggle) {
                if (toggled) {
                    button.style.backgroundColor = defaultColor;
                    toggled = false;
                    disable();
                } else {
                    button.style.backgroundColor = toggledColor;
                    toggled = true;
                    enable();
                }
            } else {
                button.style.backgroundColor = toggledColor;
                enable();
                setTimeout(() => {
                    button.style.backgroundColor = defaultColor; 
                }, 100);
            }
        });

        let settings = [];

        button.oncontextmenu = function (event) {
            if (settings.length == 0) return false;
            if (panel.settingsOpen == true) return false;

            let settingMenu = createPanel();
            settingMenu.style.left = ((parseInt(panel.style.left) +  parseInt(panel.style.width)) + 5) + "px";
            settingMenu.style.top = panel.style.top;

            panel.settingsOpen = true;

            settings.forEach(function (setting) {

                function enableSetting () {
                    setting.enable();
                    setting.enabled = true;
                }

                function disableSetting () {
                    setting.disable();
                    setting.enabled = false;
                }

                Menu.addButton(settingMenu, setting?.title, setting?.toggle, enableSetting, disableSetting, setting?.enabled);
            });

            settingMenu.addEventListener("mouseleave", () => {
                setTimeout(() => {
                    settingMenu.remove();
                    panel.settingsOpen = false;
                }, 100);
            });


            return false;
        }

        targetMenu.appendChild(button);

        return settings;
    }

    let isDragging = false;
    let offset = { x: 0, y: 0 };

    if (!panel?.header) return;

    panel.header.addEventListener('mousedown', (event) => {
        isDragging = true;
        offset.x = event.clientX - panel.getBoundingClientRect().left;
        offset.y = event.clientY - panel.getBoundingClientRect().top;
        panel.header.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            panel.style.left = `${event.clientX - offset.x}px`;
            panel.style.top = `${event.clientY - offset.y}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        panel.header.style.cursor = 'grab';
    });

    let keyListener = (event) => {
        if (event.code === 'ShiftRight') {
            if (panel.style.display == "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    };

    window.addEventListener('keydown', keyListener);
    document.querySelector("#webclient")?.contentWindow.addEventListener('keydown', keyListener);

    return panel;
}

export default Menu;