var friendsArray = require('../data/friends.js');

module.exports = function(app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendsArray);
  });
  app.post('/api/friends', function (req, res) {

    var newFriend = req.body;
    for(var i = 0; i < newFriend.scores.length; i++) {
      if(newFriend.scores[i] == "1 Strongly disagree") {
        newFriend.scores[i] = 1;
    } 
    else if(newFriend.scores[i] == "2 Disagree") {
        newFriend.scores[i] = 2;
    } 
    else if(newFriend.scores[i] == "3 Neutral") {
        newFriend.scores[i] = 3;
    } 
    else if(newFriend.scores[i] == "4 Agree") {
        newFriend.scores[i] = 4;
    } 
    else if(newFriend.scores[i] == "5 Strongly agree") {
        newFriend.scores[i] = 5;
    }}
    
    var comparisonArray = [];

    for(var i = 0; i < friendsArray.length; i++) {

      var comparedFriend = friendsArray[i];

      var totalDifference = 0;
      
      for(var j = 0; j < comparedFriend.scores.length; j++) {

        var differenceOneScore = Math.abs(comparedFriend.scores[j] - newFriend.scores[j]);
        totalDifference += differenceOneScore;
      }

      comparisonArray[i] = totalDifference;
    }

    var bestFriendNum = comparisonArray[0];
    var bestFriendI = 0;

    for(var i = 1; i < comparisonArray.length; i++) {
      if(comparisonArray[i] < bestFriendNum) {
        bestFriendNum = comparisonArray[i];
        bestFriendI = i;
      }
    }
    friendsArray.push(newFriend);
    res.json(friendsArray[bestFriendI]);
  });
}