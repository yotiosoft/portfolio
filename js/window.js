function makeWindow(title, iframe_url, width, height) {
    var position_x = window.innerWidth/2 - width/2 + (Math.random()*100);
    var position_y = window.innerHeight/2 - height/2 + (Math.random()*100);

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
