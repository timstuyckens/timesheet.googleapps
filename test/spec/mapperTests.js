/*global describe, it */
define(function(require) {
	"use strict";
	var mapperModule = require('mapperModule');
 
	describe('mapperModule', function() {
		
		describe('Event mapping of timstuyckens calendar', function() {
			//real calendar data stringified (maar \n en \" replaced by empty strings)
			var input='[{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM1Njk0ODg3MDYzMTAwMA","id":"pv3k299vu8op2053hcqg1nmu8k","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=cHYzazI5OXZ1OG9wMjA1M2hjcWcxbm11OGsgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2012-12-27T18:12:30.000Z","updated":"2012-12-31T10:14:30.631Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2012-12-31"},"end":{"date":"2013-01-01"},"transparency":"transparent","iCalUID":"pv3k299vu8op2053hcqg1nmu8k@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM1NzAzNzM4MTAwOTAwMA","id":"9ih5dnk4noqh3rbpfmhjs7tqj4","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=OWloNWRuazRub3FoM3JicGZtaGpzN3RxajQgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2012-12-20T17:28:57.000Z","updated":"2013-01-01T10:49:41.009Z","summary":"test","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-01-02"},"end":{"date":"2013-01-03"},"transparency":"transparent","iCalUID":"9ih5dnk4noqh3rbpfmhjs7tqj4@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM1OTM3OTA1OTI3OTAwMA","id":"60o635csoj3a7i6ldie9ciju54","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=NjBvNjM1Y3NvajNhN2k2bGRpZTljaWp1NTQgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-01-28T13:17:39.000Z","updated":"2013-01-28T13:17:39.279Z","summary":"verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-02-08"},"end":{"date":"2013-02-09"},"transparency":"transparent","iCalUID":"60o635csoj3a7i6ldie9ciju54@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2MTQ2NzIwNDA0MzAwMA","id":"93cc7ggjqaaec458srkdciup0g","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=OTNjYzdnZ2pxYWFlYzQ1OHNya2RjaXVwMGcgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-02-15T10:07:43.000Z","updated":"2013-02-21T17:20:04.043Z","summary":"bITe dinner","location":"Mille,Nauwstraat 10 Mechelen","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"dateTime":"2013-02-21T18:30:00+01:00"},"end":{"dateTime":"2013-02-21T21:00:00+01:00"},"iCalUID":"93cc7ggjqaaec458srkdciup0g@google.com","sequence":0,"attendees":[{"email":"stijn.guillemyn@bite.be","displayName":"Stijn Guillemyn","responseStatus":"accepted"},{"email":"wouter.deman@bite.be","displayName":"Wouter Deman","responseStatus":"accepted"},{"email":"thomas.annerel@bite.be","displayName":"Thomas Annerel","responseStatus":"needsAction"},{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"},{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","responseStatus":"accepted"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2MTUyODQwMjMwOTAwMA","id":"pg4u7li02olkqun05cpg76fbuc","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=cGc0dTdsaTAyb2xrcXVuMDVjcGc3NmZidWMgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-02-18T08:37:45.000Z","updated":"2013-02-22T10:20:02.309Z","summary":"Lunch/Dimona","location":"Antwerpen","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"dateTime":"2013-02-22T11:30:00+01:00"},"end":{"dateTime":"2013-02-22T13:00:00+01:00"},"iCalUID":"pg4u7li02olkqun05cpg76fbuc@google.com","sequence":0,"attendees":[{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"},{"email":"bart.slaets@sdworx.com","responseStatus":"accepted"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2MzYwMzgwMzc1NTAwMA","id":"hao79d5q9jqunerrbeh9ja10o4","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=aGFvNzlkNXE5anF1bmVycmJlaDlqYTEwbzQgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-03-08T09:09:47.000Z","updated":"2013-03-18T10:50:03.755Z","summary":"Lunch: evaluatie eerste jaar bITe","location":"Antwerpen","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"dateTime":"2013-03-18T12:00:00+01:00"},"end":{"dateTime":"2013-03-18T13:30:00+01:00"},"iCalUID":"hao79d5q9jqunerrbeh9ja10o4@google.com","sequence":0,"attendees":[{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2Njg4MTM3MDgyNDAwMA","id":"nheg4psfb8uc44tvt9m012764g","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=bmhlZzRwc2ZiOHVjNDR0dnQ5bTAxMjc2NGcgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-04-16T11:43:22.000Z","updated":"2013-04-25T09:16:10.824Z","summary":"bITe dinner","location":"De Passeral, Reedijk 18 1785 Merchtem","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"dateTime":"2013-04-25T19:00:00+02:00"},"end":{"dateTime":"2013-04-25T22:00:00+02:00"},"iCalUID":"nheg4psfb8uc44tvt9m012764g@google.com","sequence":1,"attendees":[{"email":"stijn.guillemyn@bite.be","displayName":"Stijn Guillemyn","responseStatus":"needsAction"},{"email":"wouter.deman@bite.be","displayName":"Wouter Deman","responseStatus":"needsAction"},{"email":"thomas.annerel@bite.be","displayName":"Thomas Annerel","responseStatus":"needsAction"},{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"},{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","responseStatus":"needsAction"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2NzE0NzA4ODA0NjAwMA","id":"af9bjmvdr362h8vh64kjtajnmk","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=YWY5YmptdmRyMzYyaDh2aDY0a2p0YWpubWsgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-02-19T15:14:44.000Z","updated":"2013-04-28T11:04:48.046Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-04-29"},"end":{"date":"2013-05-01"},"transparency":"transparent","iCalUID":"af9bjmvdr362h8vh64kjtajnmk@google.com","sequence":3,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2NzM5ODkzNDIwMDAwMA","id":"6rcnjq5j4krsjv8bf99vv2niac","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=NnJjbmpxNWo0a3JzanY4YmY5OXZ2Mm5pYWMgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-02-19T15:15:25.000Z","updated":"2013-05-01T09:02:14.200Z","summary":"Feestdag","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-05-01"},"end":{"date":"2013-05-02"},"transparency":"transparent","iCalUID":"6rcnjq5j4krsjv8bf99vv2niac@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2NzM5ODkzNjIyNjAwMA","id":"52o5sec7p1sbdlihq5cru18r2o","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=NTJvNXNlYzdwMXNiZGxpaHE1Y3J1MThyMm8gdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-02-19T15:15:41.000Z","updated":"2013-05-01T09:02:16.226Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-05-02"},"end":{"date":"2013-05-04"},"iCalUID":"52o5sec7p1sbdlihq5cru18r2o@google.com","sequence":1,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2NzgyNDMzMTQ0ODAwMA","id":"6ss2mbs68nisen41uol5kgs8j4","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=NnNzMm1iczY4bmlzZW40MXVvbDVrZ3M4ajQgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-02-19T15:15:46.000Z","updated":"2013-05-06T07:12:11.448Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-05-06"},"end":{"date":"2013-05-07"},"transparency":"transparent","iCalUID":"6ss2mbs68nisen41uol5kgs8j4@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2ODc3MjU1NDcwMDAwMA","id":"dgkju7tni2pe9bif9f3m79ipb8","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=ZGdranU3dG5pMnBlOWJpZjlmM203OWlwYjggdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-05-17T06:35:54.000Z","updated":"2013-05-17T06:35:54.700Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-05-07"},"end":{"date":"2013-05-08"},"transparency":"transparent","iCalUID":"dgkju7tni2pe9bif9f3m79ipb8@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2ODc3MjU2NjQyODAwMA","id":"2p4bb1r6v6329cg966fae5fpf4","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=MnA0YmIxcjZ2NjMyOWNnOTY2ZmFlNWZwZjQgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-05-17T06:36:06.000Z","updated":"2013-05-17T06:36:06.428Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-05-10"},"end":{"date":"2013-05-11"},"transparency":"transparent","iCalUID":"2p4bb1r6v6329cg966fae5fpf4@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM2OTkyNTQwMjgwNTAwMA","id":"l2dets8betepodcg7riqdglnp8","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=bDJkZXRzOGJldGVwb2RjZzdyaXFkZ2xucDggdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-04-16T11:56:24.000Z","updated":"2013-05-30T14:50:02.805Z","summary":"Off side  - brainstorm","description":"Overnachting http://www.terzilte.be Voor de brainstorm: Programma:-Ontvangst + uitgebreid ontbijt om 08.30u in clubhouse “10 Beaufort” van de  VVW Nieuwpoort met aansluitend briefing van de skipper.-Afvaart voorzien om 10.00u vanuit Nieuwpoort richting Duinkerke of Oostende.-Middaglunch: een belegd broodje + frisdrank. Indien we beslissen om aan te meren (Duinkerke of Oostende. Tijdens lunch brainstorm: ieder mag gedurende max. 10 min 1 idee naar voor brengen. ’s Avonds kiezen we 1 idee uit om te realiseren. De andere ideeën worden uiteraard niet vergeten…  - Aankomst te Nieuwpoort (17:00u) wordt er aan boord een Capitain’s-drink aangeboden.-Tussen 18.30 en 19.00 mogelijkheid om zich te verfrissen of eventueel een douche te nemen.- Dinner rond 19.30 restaurant “de Vierboete” of “het Vlaemsch Galioen” -Debriefing en gezellig samenzijn.","location":"VVW Nieuwpoort Watersportlaan 11 8620 Nieuwpoort route zie site: www.vvwnieuwpoort.be","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"date":"2013-05-31"},"end":{"date":"2013-06-02"},"transparency":"transparent","iCalUID":"l2dets8betepodcg7riqdglnp8@google.com","sequence":0,"attendees":[{"email":"stijn.guillemyn@bite.be","displayName":"Stijn Guillemyn","responseStatus":"accepted"},{"email":"wouter.deman@bite.be","displayName":"Wouter Deman","responseStatus":"accepted"},{"email":"thomas.annerel@bite.be","displayName":"Thomas Annerel","responseStatus":"accepted"},{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"},{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","responseStatus":"accepted"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3MjQyNTMzMDM0MDAwMA","id":"3sji80a077l30gf3uaoutdhv3s","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=M3NqaTgwYTA3N2wzMGdmM3Vhb3V0ZGh2M3MgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-06-28T13:15:30.000Z","updated":"2013-06-28T13:15:30.340Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-07-01"},"end":{"date":"2013-07-02"},"transparency":"transparent","iCalUID":"3sji80a077l30gf3uaoutdhv3s@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3Mzg4Mzg2MTg0NTAwMA","id":"q2o4b4pt355ecs2ais06sumuek","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=cTJvNGI0cHQzNTVlY3MyYWlzMDZzdW11ZWsgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-07-15T10:24:21.000Z","updated":"2013-07-15T10:24:21.845Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-07-11"},"end":{"date":"2013-07-12"},"transparency":"transparent","iCalUID":"q2o4b4pt355ecs2ais06sumuek@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3MzU3NTE1NzUxNTAwMA","id":"s1h57ofcnu08b4fu27fc09dojs","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=czFoNTdvZmNudTA4YjRmdTI3ZmMwOWRvanMgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-07-11T08:19:52.000Z","updated":"2013-07-11T20:39:17.515Z","summary":"Lunch","location":"Antwerpen","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"dateTime":"2013-07-12T12:00:00+02:00"},"end":{"dateTime":"2013-07-12T13:30:00+02:00"},"iCalUID":"s1h57ofcnu08b4fu27fc09dojs@google.com","sequence":0,"attendees":[{"email":"wouter.deman@bite.be","displayName":"Wouter Deman","responseStatus":"accepted"},{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3NjkwMTUxNzcyMTAwMA","id":"a9evlq881pk02bcnu0lh2jhohs","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=YTlldmxxODgxcGswMmJjbnUwbGgyamhvaHMgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-08-19T08:38:37.000Z","updated":"2013-08-19T08:38:37.721Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-08-16"},"end":{"date":"2013-08-17"},"transparency":"transparent","iCalUID":"a9evlq881pk02bcnu0lh2jhohs@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3NzE4MDM1ODI4NTAwMA","id":"st8secgadvq6i7ci5k41p078ks","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=c3Q4c2VjZ2FkdnE2aTdjaTVrNDFwMDc4a3MgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-08-21T21:28:30.000Z","updated":"2013-08-22T14:05:58.285Z","summary":"bITe dinner","location":"Antwerpen","creator":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"organizer":{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser"},"start":{"dateTime":"2013-09-05T19:00:00+02:00"},"end":{"dateTime":"2013-09-05T21:00:00+02:00"},"iCalUID":"st8secgadvq6i7ci5k41p078ks@google.com","sequence":1,"attendees":[{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","responseStatus":"accepted"},{"email":"stijn.guillemyn@bite.be","displayName":"Stijn Guillemyn","responseStatus":"accepted"},{"email":"wouter.deman@bite.be","displayName":"Wouter Deman","responseStatus":"needsAction"},{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true,"responseStatus":"accepted"},{"email":"thomas.annerel@bite.be","displayName":"Thomas Annerel","responseStatus":"needsAction"},{"email":"peter.de.keyser@bite.be","displayName":"Peter De Keyser","organizer":true,"responseStatus":"accepted"}],"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3NjkwMTU5Mjg0NzAwMA","id":"dvf78q57odfvsf0kvl8q7r21mg","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=ZHZmNzhxNTdvZGZ2c2Ywa3ZsOHE3cjIxbWcgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-08-19T08:39:52.000Z","updated":"2013-08-19T08:39:52.847Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-09-09"},"end":{"date":"2013-09-14"},"transparency":"transparent","iCalUID":"dvf78q57odfvsf0kvl8q7r21mg@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3NjkwMTYzNzc2MDAwMA","id":"lcoa70ra7kvtohsph7kgoosggs","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=bGNvYTcwcmE3a3Z0b2hzcGg3a2dvb3NnZ3MgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-08-19T08:39:56.000Z","updated":"2013-08-19T08:40:37.760Z","summary":"Verlof","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-09-16"},"end":{"date":"2013-09-20"},"transparency":"transparent","iCalUID":"lcoa70ra7kvtohsph7kgoosggs@google.com","sequence":0,"reminders":{"useDefault":true}},{"kind":"calendar#event","etag":"g03WUv5-dII4fsnOIFSSxqKBsYQ/MTM3NjkwMTY0Mjc1MzAwMA","id":"viuekl36dfo6p943lcsb79vfg0","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=dml1ZWtsMzZkZm82cDk0M2xjc2I3OXZmZzAgdGltLnN0dXlja2Vuc0BiaXRlLmJl","created":"2013-08-19T08:40:42.000Z","updated":"2013-08-19T08:40:42.753Z","summary":"Verlof CR","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-09-20"},"end":{"date":"2013-09-21"},"transparency":"transparent","iCalUID":"viuekl36dfo6p943lcsb79vfg0@google.com","sequence":0,"reminders":{"useDefault":true}}] ';
			var objectInput= JSON.parse(input);	
		
			it('should contain 30 items', function() {
				var results=mapperModule.mapEvents(objectInput);
				results.length.should.equal(30);
			});
			
			describe('Event mapping of the second of januari of timstuyckens calendar', function() {
				var results=mapperModule.mapEvents(objectInput);
				var result=results[0];
				it('should contain the right summary: verlof', function() {
					result.summary.should.equal("test");
				});		
				it('should contain the right status: confirmed', function() {
					result.status.should.equal("confirmed");
				});	
				it('should contain the right startDateText: woensdag 2 Jan 2013', function() {
					result.startDateText.should.equal("woensdag 2 Jan 2013");
				});	
				it('should have isWeekend set to false', function() {
					result.isWeekend.should.equal(false);
				});	
				it('should have start.date set to the correct date ', function() {
					result.start.date.should.equal("2013-01-02");
				});			
			});
			
			
			describe('Event mapping of a verlof that spans multiple days (2-3 mei)', function() {
				var results=mapperModule.mapEvents(objectInput);
				it('should containg a verlof event for the second of may', function() {
					var result= $.grep(results,function(r){
						return r.start.date && r.start.date.indexOf("2013-05-02") !==-1;
					});
					result.length.should.equal(1);
					var res=result[0];
					res.summaryCatMatch.should.equal("verlof");
				});		
				it('should containg a event for the third of may', function() {
					var result= $.grep(results,function(r){
						return r.start.date && r.start.date.indexOf("2013-05-03") !==-1;
					});
					result.length.should.equal(1);
					var res=result[0];
					res.summaryCatMatch.should.equal("verlof");
				});
				it('should not containg a event for the fourth of may', function() {
					var result= $.grep(results,function(r){
						return r.start.date && r.start.date.indexOf("2013-05-04") !==-1;
					});
					result.length.should.equal(0);
				});	
				it('should not containg a event for the first of may', function() {
					var result= $.grep(results,function(r){
						return r.start.date && r.start.date.indexOf("2013-05-01") !==-1 && r.summaryCatMatch=="verlof";
					});
					console.log("1mei",result);
					result.length.should.equal(0);
				});				
			});
		});
		describe('Event mapping of halve dagen', function() {
			var input=[
				//namiddag de 22ste aug
				{"kind":"calendar#event","etag":"gA","id":"kc","status":"confirmed","htmlLink":"h","created":"2013-08-25T11:39:54.000Z","updated":"2013-08-25T11:39:54.214Z","summary":"Verlof","creator":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"start":{"dateTime":"2013-08-22T13:00:00+02:00"},"end":{"dateTime":"2013-08-22T17:00:00+02:00"},"iCalUID":"kn9p2bt2rope1mvgjqrgh1p5dc@google.com","sequence":0,"reminders":{"useDefault":true}},
				//volledige dag 27ste
				{"kind":"calendar#event","etag":"gA","id":"pk","status":"confirmed","htmlLink":"h","created":"2013-08-25T11:37:27.000Z","updated":"2013-08-25T11:37:27.484Z","summary":"Verlof","creator":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-08-27"},"end":{"date":"2013-08-28"},"transparency":"transparent","iCalUID":"pcqtcg9pgb2ljmv50256e60s4k@google.com","sequence":0,"reminders":{"useDefault":true}},
				//voormiddag 28ste
				{"kind":"calendar#event","etag":"gA","id":"go","status":"confirmed","htmlLink":"h","created":"2013-08-25T11:37:53.000Z","updated":"2013-08-25T11:37:53.675Z","summary":"Verlof CR","creator":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"start":{"dateTime":"2013-08-28T108:00:00+02:00"},"end":{"dateTime":"2013-08-28T12:00:00+02:00"},"transparency":"transparent","iCalUID":"grbtjmp8r8q6bj8hn5rr9u8ioo@google.com","sequence":0,"reminders":{"useDefault":true}},
				//voormiddag 29ste
				{"kind":"calendar#event","etag":"gA","id":"kc","status":"confirmed","htmlLink":"h","created":"2013-08-25T11:39:54.000Z","updated":"2013-08-25T11:39:54.214Z","summary":"Verlof","creator":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"start":{"dateTime":"2013-08-29T13:00:00+02:00"},"end":{"dateTime":"2013-08-29T17:00:00+02:00"},"iCalUID":"kn9p2bt2rope1mvgjqrgh1p5dc@google.com","sequence":0,"reminders":{"useDefault":true}},
				//niet gerelateerde trainersvergadering over ganse 29ste
				{"kind":"calendar#event","etag":"gA","id":"jk","status":"confirmed","htmlLink":"h","created":"2013-06-06T19:05:30.000Z","updated":"2013-06-06T19:05:30.757Z","summary":"Trainingsvergadering ? (optioneel)","creator":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"organizer":{"email":"timstuyckens@gmail.com","displayName":"Tim Stuyckens","self":true},"start":{"date":"2013-08-29"},"end":{"date":"2013-08-30"},"transparency":"transparent","iCalUID":"j0mo8a08bcclb8ci1r2fj8fo0k@google.com","sequence":0,"reminders":{"useDefault":true}}				
			];
			var events=mapperModule.mapEvents(input);
			describe('Event op 22 aug', function() {
				var result= $.grep(events,function(r){
					return r.startDate.getTime()==new Date(2013,7,22,13).getTime();
				});
				it('should exists', function() {
					result.length.should.equal(1);
				});	
				it('should not be a full day', function() {
					result[0].isFullDay.should.equal(false);
				});	
				it('should be a a afternoon', function() {
					result[0].isAfternoon.should.equal(true);
				});	
				it('should not have te same value for forenoon and afternoon', function() {
					result[0].isAfternoon.should.equal(!result[0].isForenoon);
				});	
			});	
		});
		
		describe('Verlof van 30 december tot en met 31', function() {
			var input=[
				//bug friso
				{"kind":"calendar#event","etag":"","id":"qm6chaag861k4r7jdauo2jefus","status":"confirmed","htmlLink":"htt",
				"created":"2013-08-26T14:12:22.000Z","updated":"2013-08-26T14:17:33.197Z","summary":"Verlof CR",
				"creator":{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","self":true},
				"organizer":{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","self":true},
				"start":{"date":"2013-12-30"},
				"end":{"date":"2014-01-01"},
				"transparency":"transparent","iCalUID":"qm6chaag861k4r7jdauo2jefus@google.com","sequence":0,"reminders":{"useDefault":true}}
			];
			var events=mapperModule.mapEvents(input);
			describe('Event 30 december', function() {
				var result= $.grep(events,function(r){
					return r.start.date && r.start.date.indexOf("2013-12-30") !==-1;
				});
				it('should exists', function() {
					result.length.should.equal(1);
				});				
			});
			describe('Event 31 december', function() {
				var result= $.grep(events,function(r){
					return r.start.date && r.start.date.indexOf("2013-12-31") !==-1;
				});
				it('should exists', function() {
					result.length.should.equal(1);
				});				
			});
		});
		
		describe('Verlof op 27 september', function() {
			var input=[
				//bug friso
				{"kind":"calendar#event","etag":"\"AL4qdMUkGnEfS5hrdeTQKMJrUng/MTM3NzUyNjYyNDQwMDAwMA\"","id":"dihlpavsnhcs8km5lg88felgn4","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=ZGlobHBhdnNuaGNzOGttNWxnODhmZWxnbjQgZnJpc28uZGUucmlkZGVyQGJpdGUuYmU","created":"2013-08-26T14:13:50.000Z","updated":"2013-08-26T14:17:04.400Z","summary":"Verlof  CR","creator":{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","self":true},"organizer":{"email":"friso.de.ridder@bite.be","displayName":"Friso De Ridder","self":true},"transparency":"transparent","iCalUID":"dihlpavsnhcs8km5lg88felgn4@google.com","sequence":0,"reminders":{"useDefault":true},
				"start":{"date":"2013-09-27"},
				"end":{"date":"2013-09-28"}
				}
			];
			var events=mapperModule.mapEvents(input);
			describe('Event 27 december', function() {
				var result= $.grep(events,function(r){
					return r.start.date && r.start.date.indexOf("2013-09-27") !==-1;
				});
				it('should exists', function() {
					result.length.should.equal(1);
				});				
			});	
		});			
	});
	describe('holiday mapper Module', function() {
	
		describe('feestdagen moeten volledig dag zijn',function(){
			var input=[
				{"kind":"calendar#event","etag":"","id":"sd","status":"confirmed","htmlLink":"","created":"2013-08-11T09:12:24.000Z","updated":"2013-08-19T17:22:12.737Z","summary":"Nieuwjaar","description":"test","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"bite.be_hup0q8nht9ujrd93e68va7ct5o@group.calendar.google.com","displayName":"Feestdagen","self":true},"start":{"date":"2013-01-01"},"end":{"date":"2013-01-02"},"transparency":"transparent","iCalUID":"i4r7qgk8k603ru2sls61504cv8@google.com","sequence":0,"reminders":{"useDefault":true},"isRecoverable":false},
				{"kind":"calendar#event","etag":"","id":"seps44jkvnteugbieeae0nqqno","status":"confirmed","htmlLink":"","created":"2013-08-11T09:15:53.000Z","updated":"2013-08-11T09:15:53.277Z","summary":"Pinkstermaandag","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"bite.be_hup0q8nht9ujrd93e68va7ct5o@group.calendar.google.com","displayName":"Feestdagen","self":true},"start":{"date":"2013-05-20"},"end":{"date":"2013-05-21"},"transparency":"transparent","iCalUID":"seps44jkvnteugbieeae0nqqno@google.com","sequence":0,"reminders":{"useDefault":true}},
				{"kind":"calendar#event","etag":"","id":"kr8pjua6g8e14chkkn6tjfljs0","status":"confirmed","htmlLink":"","created":"2013-08-11T09:16:11.000Z","updated":"2013-09-30T11:24:13.581Z","summary":"Nationale feestdag","description":"recoverable","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"bite.be_hup0q8nht9ujrd93e68va7ct5o@group.calendar.google.com","displayName":"Feestdagen","self":true},"start":{"date":"2013-07-21"},"end":{"date":"2013-07-22"},"transparency":"transparent","iCalUID":"kr8pjua6g8e14chkkn6tjfljs0@google.com","sequence":0,"reminders":{"useDefault":true},"isRecoverable":true},
				{"kind":"calendar#event","etag":"","id":"tj1b118n1sk36qltt829mchv8s","status":"confirmed","htmlLink":"","created":"2013-08-11T09:16:27.000Z","updated":"2013-09-30T11:24:05.520Z","summary":"Onze lieve vrouw hemelvaart","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"bite.be_hup0q8nht9ujrd93e68va7ct5o@group.calendar.google.com","displayName":"Feestdagen","self":true},"start":{"date":"2013-08-15"},"end":{"date":"2013-08-16"},"transparency":"transparent","iCalUID":"tj1b118n1sk36qltt829mchv8s@google.com","sequence":0,"reminders":{"useDefault":true}},
				{"kind":"calendar#event","etag":"","id":"id9agce1g7u3fpr86rs8odngd0","status":"confirmed","htmlLink":"","created":"2013-08-11T09:16:52.000Z","updated":"2013-08-11T09:16:52.373Z","summary":"Allerheiligen","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"bite.be_hup0q8nht9ujrd93e68va7ct5o@group.calendar.google.com","displayName":"Feestdagen","self":true},"start":{"date":"2013-11-01"},"end":{"date":"2013-11-02"},"transparency":"transparent","iCalUID":"id9agce1g7u3fpr86rs8odngd0@google.com","sequence":0,"reminders":{"useDefault":true}},
				{"kind":"calendar#event","etag":"","id":"4kg8io1k15hfm51at2kfk9on2k","status":"confirmed","htmlLink":"","created":"2013-09-30T17:11:18.000Z","updated":"2013-09-30T17:11:36.433Z","summary":"bug testen","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"bite.be_hup0q8nht9ujrd93e68va7ct5o@group.calendar.google.com","displayName":"Feestdagen","self":true},"start":{"dateTime":"2013-11-06T10:00:00+01:00"},"end":{"dateTime":"2013-11-06T11:00:00+01:00"},"transparency":"transparent","iCalUID":"4kg8io1k15hfm51at2kfk9on2k@google.com","sequence":1,"reminders":{"useDefault":true}}
			];
			var holidays=mapperModule.mapHolidays(input);
			describe('Allerheiligen bestaat', function() {
				var result= $.grep(holidays,function(r){
					return r.start.date && r.start.date.indexOf("2013-11-01") !==-1;
				});
				it('should exists', function() {
					result.length.should.equal(1);
				});				
			});	
			describe('De niet volledig dag op 6 november bestaat niet', function() {
				var result= $.grep(holidays,function(r){
					return (r.start && r.start.date && r.start.date.indexOf("2013-11-06") !==-1) || (r.start.dateTime && r.start.dateTime.indexOf("2013-11-06") !==-1);
				});
				it('should exists', function() {
					result.length.should.equal(0);
				});				
			});	
			describe('Van de 6 events is er 1 niet volledig dus zouden er maar 5 feestdagen moge nzijn', function() {
				it('should exists', function() {
					holidays.length.should.equal(5);
				});				
			});			
		});
	});
	describe('settings mapper Module', function() {
		
		describe('Dagen van google docs moeten correct gemapped zijn',function(){	
			var input=[
				{"employee":"tim.stuyckens@bite.be","year":"2013","verlof":"20","verlof-cr":"12","verlof-special":"0","rowNumber":1},
				{"employee":"wouter.deman@bite.be","year":"2013","verlof":"10","verlof-cr":"22","verlof-special":"3","rowNumber":2}
			];
			
			describe('Voor Tim in 2013 ', function() {
				var res=mapperModule.mapSettings(input,"tim.stuyckens@bite.be",2013);
				var result= $.grep(res,function(r){
					return r.name==="Verlof" && r.number==20;
				});
				it('moet de categorie verlof bestaan met 20 dagen', function() {
					result.length.should.equal(1);
				});
				it('moeter er 2 categoriën zijn', function() {
					res.length.should.equal(2);
				});
			});	
			describe('Voor Tim in 2012 ', function() {
				var res=mapperModule.mapSettings(input,"tim.stuyckens@bite.be",2012);
				it('mag er niets gevonden worden', function() {
					res.length.should.equal(0);
				});
			});	
		});
		
		describe("halve en lege dagen moeten correct gemapped worden",function(){
			var input=[
				{"employee":"tim.stuyckens@bite.be","year":"2013","verlof":"20","verlof-cr":"12","verlof-test":"0,5","rowNumber":1},
				{"employee":"wouter.deman@bite.be","year":"2013","verlof":"20","verlof-cr":"12","verlof-test":"","rowNumber":2},
			];
			
			describe('Halve dag op verlof test categorie moet doorkomen bij Tim', function() {
				var res=mapperModule.mapSettings(input,"tim.stuyckens@bite.be",2013);
				var result= $.grep(res,function(r){
					return r.name==="Verlof TEST" && r.number==0.5;
				});
				it('should contain a category', function() {
					result.length.should.equal(1);
				});
			});	
			describe('Lege categoriën mogen niet doorkomen', function() {
				var res=mapperModule.mapSettings(input,"wouter.deman@bite.be",2013);
				var result= $.grep(res,function(r){
					return r.name==="Verlof TEST" ;
				});
				it('should have no result', function() {
					result.length.should.equal(0);
				});
			});	
		});
	});
	
	describe('recoverable holidays mapper Module', function() {
	
		describe('recoverable dagen moeten gemapped worden naar category',function(){
			var input=[
				//ééntje niet
				{"isRecoverable":false,"kind":"calendar#event","etag":"","id":"","status":"confirmed","htmlLink":"","created":"2013-08-11T09:12:24.000Z","updated":"2013-08-19T17:22:12.737Z","summary":"Nieuwjaar","description":"test","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"","displayName":"Feestdagen","self":true},"start":{"date":"2013-01-01"},"end":{"date":"2013-01-02"},"transparency":"transparent","iCalUID":"@google.com","sequence":0,"reminders":{"useDefault":true}},
				//twee wel
				{"isRecoverable":true,"kind":"calendar#event","etag":"","id":"","status":"confirmed","htmlLink":"","created":"2013-08-11T09:16:11.000Z","updated":"2013-09-30T11:24:13.581Z","summary":"Nationale feestdag","description":"recoverable","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"","displayName":"Feestdagen","self":true},"start":{"date":"2013-07-21"},"end":{"date":"2013-07-22"},"transparency":"transparent","iCalUID":"@google.com","sequence":0,"reminders":{"useDefault":true}},
				{"isRecoverable":true,"kind":"calendar#event","etag":"","id":"","status":"confirmed","htmlLink":"","created":"2013-08-11T09:16:11.000Z","updated":"2013-09-30T11:24:13.581Z","summary":"Nationale feestdag","description":"recoverable","creator":{"email":"tim.stuyckens@bite.be","displayName":"Tim Stuyckens"},"organizer":{"email":"","displayName":"Feestdagen","self":true},"start":{"date":"2013-07-22"},"end":{"date":"2013-07-23"},"transparency":"transparent","iCalUID":"@google.com","sequence":0,"reminders":{"useDefault":true}}
			];
			var res=mapperModule.mapHolidaysToSetting(input,"tim.stuyckens@bite.be",2013);
			it('should only create one extra category', function() {
				res.length.should.equal(1);
			});
			it('the category should have 2 days', function() {
				res[0].number.should.equal(2);
			});
			it('should have the right cat name', function() {
				res[0].name.should.equal("Verlof VF");
			});
		});
	});
});