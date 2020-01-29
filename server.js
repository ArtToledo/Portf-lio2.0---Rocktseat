const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

server.get('/', function(req, res) {
    const about = {
        avatar_url: 'https://scontent.fbhz3-1.fna.fbcdn.net/v/t1.0-9/p960x960/46489681_2107076559359276_7336840164989206528_o.jpg?_nc_cat=111&_nc_oc=AQm9Ul0kc_Iue1RAqeNvyfn_Pm5aqiGig1aAfFhZtvdlOXAsE4zRv3NOswsqGNiqRaHjg8DRv3icU3dCyt9UzJ2F&_nc_ht=scontent.fbhz3-1.fna&oh=8818d96053235c72e64add4f1fdcc18e&oe=5E8A7B52',
        name: 'Arthur Toledo',
        role: 'Estudante de programação',
        description: 'Desenvolvedor Web, focado em sistemas feito com HTML, CSS e JS',
        links: [
            { name: 'Github', url: 'https://github.com/ArtToledo' },
            { name: 'Instagram', url: 'https://www.instagram.com/art_toledo/' },
            { name: 'Linkedin', url: 'https://www.linkedin.com/in/arthur-toledo-111b71196/' }
        ]
    }

    return res.render('about', { about });
});

server.get('/portfolio', function(req, res) {
    return res.render('portfolio', { items: videos });
});

server.get('/video', function (req, res) {
    const id = req.query.id;
    
    const video = videos.find(function(video) {
        return video.id == id;
    });

    if (!video) {
        return res.send('Video not found!');
    }

    return res.render('video', {item: video})

});

server.listen(5000, function() {
    console.log('Server is running');
});