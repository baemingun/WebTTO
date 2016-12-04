/*Page State
0 : login.php
1 : lobby.php
2 : room.php
3 : play.php
4 : result.php
5 : select.php
*/
<<<<<<< HEAD
var STATE = 2;
=======
var STATE = 0;

var name = "none";
>>>>>>> ac227910fe737e45efbb5b884edb61b88db4270c
var result_score;
var wsUri="ws://localhost:9000/WEBTTO/play_server.php";
var	websocket=new WebSocket(wsUri);

function login_ready(){
	$("#input_enter").on("click",function(){
		if($('#nickname').val().length == 0){
			alert("이름을 제대로 적으시오!");
			return;
		}
		name = $('#nickname').val();

		STATE=1;
		state_change();
	});	
}

function lobby_ready(){
	$("#enter").on("click",function(){
		STATE=2;
		state_change();
	});
}

function room_ready(){
	websocket.onopen = function() { // connection is open 
		console.log("Connected");
		$("#ready_btn").on("click",function(){
			var data = {"type":"user_ready"};
			websocket.send(JSON.stringify(data));
		});
		$("#select_btn").on("click",function(){
			STATE=5;
			state_change();
		});
	}
	websocket.onmessage=function(msg){
		var data=JSON.parse(msg.data);
		console.log(data["start"]);
		if(data.start>6){
			STATE=3;
			state_change();
		}
	}
	websocket.onclose=function(){
		console.log("Disconnected");
	}
}

function result_ready(){
	$("#gage_container").append("<h1> 최종 점수 : "+result_score+"</h1>");
	$("#exit").on("click",function(){
		STATE=1;
		state_change();
	});
}

$(document).ready(function(){
	state_change();
});

function state_change(){
	switch(STATE){
		case 0:
			$("body").load("login.php",function(){login_ready();});
		break;
		case 1:
			$("body").load("lobby.php",{nick:name},function(){lobby_ready();});
		break;
		case 2:
			$("body").load("room.php",function(){room_ready();});
		break;
		case 3:
			$("body").load("play.php");
		break;
		case 4:
			$("body").load("result.php",function(){result_ready();});
		break;
		case 5:
			$("body").load("select.php");
		break;
	}
}