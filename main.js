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
                var userurl = "https://www.twitch.tv/"
                userurl += streamer;
                url = "https://wind-bow.glitch.me/twitch-api/streams/";
                url += streamer;
                $.ajax(url, {
                    dataType: "json",
                    success: function(stream) {
                        if (!stream.stream) {
                            var html = formatUser(name, logo, userurl, null, null);
                            $(".main").append(html);
                        }
                        else {
                            var html = formatUser(name, logo, userurl, stream.stream.game, stream.stream.channel.status);
                            $(".main").append(html);
                        }
                    }
                });
            }
        });
    });

    function formatUser(name, logo, userurl, game, desc) {
        var html = "";
        html += "<div>";
        html += "<img src=\"" + logo + "\" alt=\"" + name + "'s logo\"><!--";
        html += "--><a target=\"_blank\" href=\"" + userurl + "\"><h3>" + name + "</h3></a><!--";
        if (game) {
            html += "--><p>" + game + " " + desc + "</p>";
        }
        else {
            html += "--><p>Offline</p>"
        }
        html += "</div>";
        return html;
    }
});