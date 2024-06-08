var window_mergin = 50;
var next_window_x = window_mergin ;
var next_window_y = window_mergin ;
var before_window_y = window_mergin ;
var window_id = 0;

function makeWindowAutoPos(title, iframe_url, width, height, maximize) {
    if (width + window_mergin * 2 > window.innerWidth) {
        width = window.innerWidth - window_mergin * 2;
    }
    if (height + window_mergin * 2 > window.innerHeight) {
        height = window.innerHeight - window_mergin * 2;
    }

    var position_x = next_window_x;
    var position_y = before_window_y;

    if (position_x + width/2 > window.innerWidth) {
        position_x = window_mergin;
        position_y = next_window_y;
        before_window_y = next_window_y;
    }
    if (position_y > window.innerHeight) {
        window_mergin = window_mergin * 1.5;
        position_x = window_mergin;
        position_y = window_mergin;
        before_window_y = window_mergin;
    }
    next_window_x = position_x + width + window_mergin;
    next_window_y = position_y + height + window_mergin;

    makeWindow(title, iframe_url, width, height, position_x, position_y, maximize);
}

function makeWindow(title, iframe_url, width, height, position_x, position_y, maximize) {
    console.log(Math.random());
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log(position_x);
    console.log(position_y);

    window_id++;
    var target_main = document.getElementById("main_body");
    const event = new Event("built_" + window_id);
    target_main.addEventListener("built_" + window_id, function() {
        console.log("event from window " + window_id);
    }, false);

    // create a default jsPanel
    if (!maximize) {
        return jsPanel.create({
            headerTitle: title,
            panelSize: width+" "+height,
            position: {
                my:      "left-top",
                at:      "left-top",
                offsetX: position_x,
                offsetY: position_y
            },
            content: '<iframe class="window_frame" src="'+iframe_url+'"></iframe>',
            callback: function(panel) {
                target_main.dispatchEvent(event);
                console.log(target_main);
                console.log("new event built");
            }
        });
    }
    else {
        return jsPanel.create({
            headerTitle: title,
            panelSize: width+" "+height,
            position: {
                my:      "left-top",
                at:      "left-top",
                offsetX: position_x,
                offsetY: position_y
            },
            content: '<iframe class="window_frame" src="'+iframe_url+'"></iframe>',
        }).maximize();
    }
}
