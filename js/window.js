var window_mergin = 50;
var window_start_pos = window_mergin;
var next_window_x = window_mergin ;
var next_window_y = window_mergin ;
var before_window_y = window_mergin ;
var window_id = 0;

var target_main = document.getElementById("main_body");
/*
document.addEventListener("built", function(e) {
    console.log(e);
    console.log("event from window, id: " + e.target.id);
    console.log("event from window, id: " + e.detail.id);
});
*/

function resetWindowPos() {
    window_start_pos = window_start_pos + 50;
    next_window_x = window_start_pos;
    next_window_y = window_start_pos;
    before_window_y = window_start_pos;
}

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
        position_x = window_start_pos;
        position_y = next_window_y;
        before_window_y = next_window_y;
    }
    if (position_y > window.innerHeight) {
        window_start_pos = window_start_pos + 50;
        position_x = window_start_pos;
        position_y = window_start_pos;
        before_window_y = window_start_pos;
    }
    next_window_x = position_x + width + window_start_pos;
    next_window_y = position_y + height + window_start_pos;

    makeWindow(title, iframe_url, width, height, position_x, position_y, maximize);
}

function makeWindow(title, iframe_url, width, height, position_x, position_y, maximize) {
    /*
    console.log(Math.random());
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log(position_x);
    console.log(position_y);
    */

    window_id++;

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
                const event = new CustomEvent("built", {
                    bubbles: true,
                    detail: { id: window_id },
                });
                panel.dispatchEvent(event);
                /*
                console.log(target_main);
                console.log("new event built");
                */
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
