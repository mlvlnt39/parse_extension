document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getFollowers' }, function(response) {
        displayFollowers(response.followers);
      });
    });
  });
  
  function displayFollowers(followers) {
    var followersBody = document.getElementById('followers-body');
  
    followers.forEach(function(follower) {
      var row = document.createElement('tr');
      var nameCell = document.createElement('td');
      var followersCell = document.createElement('td');
      var linkCell = document.createElement('td');
      var link = document.createElement('button');
      link.classList.add('btn');
      followersCell.classList.add('text-success');
  
      nameCell.textContent = follower.name;
      followersCell.textContent = follower.followers;
      link.href = follower.link;
      link.textContent = "Link";
      link.target = "_blank";
  
      row.appendChild(nameCell);
      row.appendChild(followersCell);
      row.appendChild(linkCell);
      linkCell.appendChild(link);
  
      followersBody.appendChild(row);
    });
  }
  