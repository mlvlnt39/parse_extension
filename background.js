chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getFollowers') {
      var appRows = document.querySelectorAll('tr.app');
      var followers = [];
  
      appRows.forEach(function(row) {
        var nameCell = row.querySelector('.text-left a');
        var followersCell = findFollowersCell(row);
  
        if (nameCell && followersCell) {
          var name = nameCell.textContent;
          var followersCount = followersCell.textContent;
          followers.push({ name: name, followers: followersCount });
        }
      });
  
      sendResponse({ followers: followers });
    }
  });
  
  function findFollowersCell(row) {
    var headerRow = document.querySelector('thead tr');
    var headerCells = headerRow.querySelectorAll('th');
    var followersCell = null;
  
    headerCells.forEach(function(cell, index) {
      if (cell.textContent.trim() === 'Followers') {
        followersCell = row.querySelectorAll('td')[index];
      }
    });
  
    return followersCell;
  }
  