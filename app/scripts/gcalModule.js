define(["async!https://apis.google.com/js/client.js?test=test"], function() {
	//wrapper around google calendar api


	var GCalModule = function() {
		var self = this;
		var mainDfd = new jQuery.Deferred();
		var calClient = false;
		var oauthClient = false;
		var OAuthScopes = {
			read: "https://www.googleapis.com/auth/calendar.readonly",
			readWrite: "https://www.googleapis.com/auth/calendar"
		};
		var config = {
			clientId: '235814546194.apps.googleusercontent.com', //werkt enkel vanaf gymhaacht.be
			apiKey: "AIzaSyBu67W-Rs4jQr0sGksPujKU92ClbStmSZs", //aanvragen https://code.google.com/apis/console/b/0/#project:235814546194
			scopes: OAuthScopes.read
		};

		var handleAuthResult = function(authResult) {
			if (authResult && !authResult.error) {
				loadApis().then(function() {
					mainDfd.resolve();
				});
			} else {
				mainDfd.reject();
			}
		};

		var checkAuth = function() {
			gapi.auth.authorize({
				client_id: config.clientId,
				scope: config.scopes,
				immediate: true
			}, handleAuthResult);
		};

		var loadApis = function() {
			var dfd = new jQuery.Deferred();
			$.when(loadOauthApi(), loadCalendarApi()).then(function() {
				dfd.resolve();
			});
			return dfd;
		};
		var loadOauthApi = function() {
			var dfd = new jQuery.Deferred();
			gapi.client.load('oauth2', 'v2', function() {
				//http://developers.google.com/apis-explorer/#p/oauth2/v2/oauth2.userinfo.get?_h=2&
				oauthClient = gapi.client.oauth2;
				dfd.resolve(gapi.client.oauth2);
			});
			return dfd;
		};
		var loadCalendarApi = function() {
			var dfd = new jQuery.Deferred();
			gapi.client.load('calendar', 'v3', function() {
				//https://developers.google.com/apis-explorer/#p/calendar/v3/ 
				calClient = gapi.client.calendar;
				dfd.resolve(gapi.client.calendar);
			});
			return dfd;
		};

		var getEventsItemsWork = function(requestData) {
			var dfd = new jQuery.Deferred();
			requestData.fields = "accessRole,description,etag,items,kind,nextPageToken,summary,timeZone,updated";
			requestData.orderBy = "startTime";
			requestData.singleEvents = true;
			var request = calClient.events.list(requestData);
			request.execute(function(resp) {
				resp.message && console.log(resp.message);
				resp.error && console.log(resp.error);
				if (resp.items) {
					dfd.resolve(resp.items);
				}
			});
			return dfd;
		};

		self.getUserInfo = function() {
			var dfd = new jQuery.Deferred();
			var request = oauthClient.userinfo.get();
			request.execute(function(resp) {
				resp.error && console.log(resp.error);
				!resp.error && dfd.resolve(resp);
			});
			return dfd;
		};

		self.getEventsItems = function(calId) {
			var currentYear = new Date().getFullYear();
			var timeMin = currentYear + "-01-01T00:00:00+02:00";
			var timeMax = (currentYear + 1) + "-01-01T00:00:00+02:00";
			return getEventsItemsWork({
				'calendarId': calId,
				'timeMin': timeMin,
				'timeMax': timeMax
			});
		};

		self.getCalendarList = function() {
			var dfd = new jQuery.Deferred();
			var request = calClient.calendarList.list();
			request.execute(function(resp) {
				resp.message && console.log(resp.message);
				resp.error && console.log(resp.error);
				if (resp.items) {
					dfd.resolve(resp.items);
				}
			});
			return dfd;
		};
		self.authorizeNotImmediate = function() {
			mainDfd = new jQuery.Deferred();
			gapi.auth.authorize({
				client_id: config.clientId,
				scope: config.scopes,
				immediate: false
			}, handleAuthResult);
			return mainDfd;
		};
		self.authorize = function() {
			mainDfd = new jQuery.Deferred();
			gapi.client.setApiKey(config.apiKey);
			window.setTimeout(checkAuth, 1); //comes from sample ...
			return mainDfd; //resolves when user is authenticated AND api is loaded
		};
	};

	return GCalModule;
});