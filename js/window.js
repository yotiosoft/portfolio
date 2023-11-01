const window_mergin = 50;
var next_window_x = 50;
var next_window_y = 50;
var before_window_y = 50;

function makeWindowAutoPos(title, iframe_url, width, height) {
    var position_x = next_window_x;
    var position_y = before_window_y;

    if (position_x + width/2 > window.innerWidth) {
        position_x = window_mergin;
        position_y = next_window_y;
        before_window_y = next_window_y;
    }
    next_window_x = position_x + width + window_mergin;
    next_window_y = position_y + height + window_mergin;

    makeWindow(title, iframe_url, width, height, position_x, position_y);
}

function makeWindow(title, iframe_url, width, height, position_x, position_y) {
    console.log(Math.random());
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log(position_x);
    console.log(position_y);

    // create a default jsPanel
    jsPanel.create({
        headerTitle: title,
        panelSize: width+" "+height,
        position: {
            my:      "left-top",
            at:      "left-top",
            offsetX: position_x,
            offsetY: position_y
        },
        content: '<iframe src="'+iframe_url+'" style="width: 100%; height: 100%;"></iframe>',
    });
}
