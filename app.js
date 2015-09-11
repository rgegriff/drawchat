drawing_board = LC.init(
    document.querySelector('#drawing'), {
        imageURLPrefix: '/bower_components/literallycanvas/img',
        imageSize: {
            width: 400,
            height: 400
        }

    }
);
myDataRef = new Firebase('https://radiant-heat-2818.firebaseio.com/');

var stamp_new_img = function(src) {
    var tmpl = document.querySelector('template');
    tmpl.content.querySelector('img').src = src;
    var clone = document.importNode(tmpl.content, true);
    var stream = document.querySelector('#img-stream');
    stream.appendChild(clone);
    stream.scrollLeft = stream.scrollWidth;


}

myDataRef.limitToLast(5).on('child_added', function(snapshot) {
    stamp_new_img(snapshot.val().src);

});
document.querySelector('#post').addEventListener("click", function() {
    var img = drawing_board.getImage().toDataURL("img/png");
    myDataRef.push({
        src: img
    });
    drawing_board.clear();
});
