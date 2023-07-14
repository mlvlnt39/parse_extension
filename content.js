// Функция для поиска appid и followers
function findAppIdsAndFollowers() {
    var elements = document.querySelectorAll('[data-appid]');
    var data = [];
  
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var appId = element.getAttribute('data-appid');
      var row = document.createElement('tr');
      var appIdCell = document.createElement('td');
      var appIdLink = document.createElement('a');
      appIdLink.href = 'https://steamdb.info/app/' + appId;
      appIdLink.textContent = appId;
      appIdCell.appendChild(appIdLink);
      var followersCell = document.createElement('td');
      row.appendChild(appIdCell);
      row.appendChild(followersCell);
      data.push({ appId: appId, followersCell: followersCell });
    }
  
    // Вместо вывода в консоль, отправляем данные в background.js
    chrome.runtime.sendMessage({ action: "addDataToTable", count: data.length });
    return data;
  }
  
  // Функция для поиска followers и заполнения таблицы
  function findAndFillFollowers(data) {
    var appRows = document.querySelectorAll('tr.app');
    appRows.forEach(function(row, index) {
      var followersCell = row.querySelectorAll('td[data-sort]')[1];
      if (followersCell) {
        var followers = followersCell.textContent;
        data[index].followersCell.textContent = followers;
      }
    });
  }
  
  // Вызываем функции и сохраняем данные
  var data = findAppIdsAndFollowers();
  findAndFillFollowers(data);
  
  // Обновление элементов при изменении содержимого страницы
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        findAndFillFollowers(data);
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Отправляем данные в popup.js
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "getData") {
      sendResponse({ data: data });
    }
  });
  