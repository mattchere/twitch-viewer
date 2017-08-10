$(document).ready(function() {
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

    streamers.forEach(function(streamer) {
        var url = "https://wind-bow.glitch.me/twitch-api/users/";
        url += streamer;
        $.ajax(url, {
            dataType: "json",
            success: function(user) {
                var name = user.display_name;
                var logo = user.logo;
                var link = "https://www.twitch.tv/"
                link += streamer;
                url = "https://wind-bow.glitch.me/twitch-api/streams/";
                url += streamer;
                $.ajax(url, {
                    dataType: "json",
                    success: function(stream) {
                        if (!stream.stream) {
                            var html = formatUser(name, logo, link, null, null);
                            $(".main").append(html);
                        }
                        else {
                            var html = formatUser(name, logo, link, stream.stream.game, stream.stream.channel.status);
                            $(".main").append(html);
                        }
                    }
                });
            }
        });
    });

    function formatUser(name, logo, link, game, desc) {
        var html = "";
        html += '<div><img src="' + logo + '" alt="' + name + "'s logo> ";
        html += '<a href="' + link + '"><h3>' + name + "</h3></a>";
        if (game) {
            html += '<p>' + game + ' ' + desc + '</p>'
        }
        html += '</div>';
        return html;
    }
});