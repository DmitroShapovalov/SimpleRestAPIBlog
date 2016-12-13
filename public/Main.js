
$(function () {
    $(document).ready(simpleGet());
    addTopic();
    newPost();
});

function simpleGet() {
    $.get('/api/topic', function (data, status) {
        for (var i = 0; i < data.length; i++) {
            var author = $('<div>').append(data[i].author).addClass('author');
            var d = new Date(data[i].date);
            var postDate = $('<div>').append(d.toDateString()
                +" "+ d.getHours()
                +":"+(d.getMinutes()<10?'0':'') + d.getMinutes()).addClass("post-date");
            var name = $('<div>').append(data[i].name).addClass('name');
            var text = $('<div>').append(data[i].text).addClass('topic-text');
            var topic = $('<div>').append(author).append(name).append(postDate).append(text).addClass('topic');
            $('.blog').append(topic);
        }
        console.dir(data);
        console.dir(status);
    })
}

function newPost() {
    $('.send-button').click(function () {
        var newName = $('.name-input').value;
        var newAuthor = $('.author-input').value;
        var newText = $('.text-input').value;
        var newDate = new Date();
        if (newName == '' && newAuthor == '' && newText == ''){
            alert("Enter data in empty field");
        } else {
            var newTopic = new Topic(newName, newAuthor, newText, newDate);
            $.ajax({
                url: '/api/topic',
                type: 'POST',
                data: newTopic.getSimpleModel(),
                success: simpleGet()
            })
        }
    })
}

function addTopic() {
    $('.add-button').click(function () {
        $('.author-input').toggle();
        $('.name-input').toggle();
        $('.text-input').toggle();
        $('.send-button').toggle();
    })
}

function Topic(name, author, text, date) {


    this.name = name;
    this.author = author;
    this.text = text;
    this.date = date;
}

Topic.prototype.getSimpleModel = function () {
    return {
        name: this.name,
        author: this.author,
        date: this.date,
        text: this.text
    }
};