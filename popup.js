chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getData" }, function(response) {
      if (response && response.data) {
        var table = document.getElementById('results-table');
        for (var i = 0; i < response.data.length; i++) {
          var row = document.createElement('tr');
          var appIdCell = document.createElement('td');
          var appIdLink = document.createElement('a');
          appIdLink.href = 'https://steamdb.info/app/' + response.data[i].appId;
          appIdLink.textContent = response.data[i].appId;
          appIdCell.appendChild(appIdLink);
          var followersCell = document.createElement('td');
          followersCell.textContent = response.data[i].followers;
          row.appendChild(appIdCell);
          row.appendChild(followersCell);
          table.appendChild(row);
        }
      }
    });
  });
  