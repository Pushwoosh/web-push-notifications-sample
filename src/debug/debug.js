Pushwoosh.push(function(api) {
  console.log('EVENT: onReady', api);
  checkSubscription();
  getCurrentTags();
  displayApiParams();
  var params = Pushwoosh._initParams || {};
  var elem = document.querySelector('#initParams');

  try {
    insertSourceCode(elem, params);
  }
  catch (e) {
    console.error('Got error on stringify default params', params);
  }
});

/**
 * Alternative variant to subscribe onReady event
 */
Pushwoosh.push(['onReady', function(api) {
  console.log('EVENT: onReady alternative', api);
}]);

Pushwoosh.push(['onSubscribe', function(api) {
  console.log('EVENT: onSubscribe', api);
  checkSubscription();
}]);

Pushwoosh.push(['onUnsubscribe', function(api) {
  console.log('EVENT: onUnsubscribe', api);
  checkSubscription();
}]);

Pushwoosh.push(['onRegister', function(api) {
  console.log('EVENT: onRegister', api);
}]);

Pushwoosh.push(['onPermissionPrompt', function(api) {
  console.log('EVENT: onPermissionPrompt', api);
  toggleNodesVisibility('.permission-status', 'prompt');
}]);

Pushwoosh.push(['onPermissionDenied', function(api) {
  console.log('EVENT: onPermissionDenied', api);
  toggleNodesVisibility('.permission-status', 'denied');
  checkSubscription();
}]);

Pushwoosh.push(['onPermissionGranted', function(api) {
  console.log('EVENT: onPermissionGranted', api);
  toggleNodesVisibility('.permission-status', 'granted');
  checkSubscription();
}]);

function insertSourceCode(elem, data) {
  elem.innerHTML = JSON.stringify(data, null, 2) || '';
  hljs.highlightBlock(elem);
}

function displayApiParams() {
  try {
    var params = Pushwoosh.api.params || {};
    var elem = document.querySelector('#apiParams');
    insertSourceCode(elem, params);
  }
  catch (e) {
    console.error('Got error on displaying API params', e);
  }
}

function checkSubscription() {
  Pushwoosh.isSubscribed()
    .then(function(res) {
      toggleNodesVisibility('.subscription-status', res ? 'actionUnsubscribe' : 'actionSubscribe');
    })
    .catch(function(err) {
      console.error('Is subscribed error', err);
    })
    .then(displayApiParams);
}

function toggleNodesVisibility(selector, id) {
  var nodes = document.querySelectorAll(selector);
  [].forEach.call(nodes, function(el) {
    el.style.display = el.id === id ? 'inline' : 'none';
  });
}

function getCurrentTags() {
  var elem = document.querySelector('#currentTags');
  elem.innerHTML = 'Loading…';
  Pushwoosh.api.getTags()
    .then(function(res) {
      res = res || {};
      insertSourceCode(elem, res.result || {});
    })
    .catch(function(err) {
      insertSourceCode(elem, err || {});
    });
}

document.querySelector('#getCurrentTags').addEventListener('click', getCurrentTags);

document.querySelector('#registerUserForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var button = form.querySelector('button');
  var input = form.querySelector('[name="userId"]');
  var successNode = form.querySelector('.success');
  var errorNode = form.querySelector('.error');
  var userId = input.value;
  button.setAttribute('disabled', 'disabled');
  Pushwoosh.api.registerUser(userId)
    .then(function() {
      input.value = '';
      errorNode.innerHTML = '';
      successNode.innerHTML = 'Data successfully submitted ' + new Date();
    })
    .catch(function(err) {
      successNode.innerHTML = '';
      console.error(err);
      errorNode.innerHTML = 'Got some error on submit. Check console for details.';
    })
    .then(function() {
      button.removeAttribute('disabled');
    });
});

document.querySelector('#setTagsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var button = form.querySelector('button');
  var input = form.querySelector('[name="tags"]');
  var successNode = form.querySelector('.success');
  var errorNode = form.querySelector('.error');
  var tags = input.value;

  try {
    tags = JSON.parse(tags);
    errorNode.innerHTML = '';
  }
  catch (err) {
    successNode.innerHTML = '';
    console.error(err);
    errorNode.innerHTML = 'JSON.parse error. Expected object: {[k: string]: any}';
    return;
  }

  button.setAttribute('disabled', 'disabled');
  Pushwoosh.api.setTags(tags)
    .then(function(res) {
      var skipped = res && res.skipped || [];
      if (!skipped.length) {
        input.value = '';
        errorNode.innerHTML = '';
        successNode.innerHTML = 'Data successfully submitted ' + new Date();
      } else {
        successNode.innerHTML = '';
        errorNode.innerHTML = skipped.map(function(item) {
          return 'Skipped tag "' + item.tag + '", reason "' + item.reason + '".';
        }).join('n\ ');
      }
    })
    .catch(function(err) {
      console.error(err);
      successNode.innerHTML = '';
      errorNode.innerHTML = 'Got some error on submit. Check console for details.';
    })
    .then(function() {
      button.removeAttribute('disabled');
    });
});
