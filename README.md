# GetRecs
Personalized music recommendations added straight to your account.

## How It Works
There two sections to the web application. One is a music recommendation system and playlist generator, while the other is a statistics page. Both parts of the web application use Spotify data as well.

### Recommedations and Playlist Generator
The recommendation system used on the site uses Spotify's recommendation algorithm via their API endpoint. The recommendation system requires that one of the categories are filled in, but you could fill all of them, up to 5 items in total across all three.

A special behavior to note is how the categories work in the recommendation system. The artist and track inputs utilize Spotify's search endpoint to grab the top item in the search according to the input, using that to recommend items. For example, if one puts the track "Money" believing it to be Money by Pink Floyd, it may not actually use that, as there are other songs with the same name. To alleviate this, you can specify the search just as you would on Spotify's app: "Money by Pink Floyd" can be inputted instead.

Once you search for recommendations, a table will come up with the specified number of tracks. You can click on them to open the Spotify app to listen to the tracks, or click on the artist. Moreover, at the bottom of the table, you can click on the Convert to Playlist button. This button will prompt you for a name and description of the new playlist containing the recommendations. Once you are finished, a notification will pop up and your playlist will be automatically uploaded to your account in the app! 

### Statistics
The statistics page has three parts: top tracks, artists, and genres. It also has three timelines, with a couple years of data, 6 months, or 4 weeks. This page simply displays all this data for you to track your listening, and has links to the tracks or artists that open the Spotify application. Enjoy!
