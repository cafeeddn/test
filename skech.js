const startpage = document.querySelector("#startpage");
const testpage = document.querySelector("#testpage");
const resultpage = document.querySelector("#resultpage");
const endpoint = 11;
let target = document.querySelector("#dynamic");
let stringArr="당신의 개인정보는 안녕하신가요?";
let selectStringArr = stringArr.split("");
let score = 0;



function randomString(){
	let stringArr="당신의 개인정보는 안녕하신가요?";
	let selectStringArr = stringArr.split("");
	
	return selectStringArr;
}

function resetTyping(){
	target.textContent="";
	dynamic(randomString());
}

function dynamic(randomArr){
	if(randomArr.length>0){
		target.textContent +=randomArr.shift();
		setTimeout(function(){
			dynamic(randomArr);},80);
	}
	else{
		setTimeout(resetTyping, 3000);
	}
	
}

dynamic(randomString());

function blink(){
	target.classList.toggle("active");
}
setInterval(blink, 500);

function gotresult(){
	testpage.style.display = "none";
	resultpage.style.display = "block";
	
	const scorecontain = document.querySelector(".scorecontain");
	const existresult = scorecontain.querySelector(".scoretext");
	
	if (existresult) {
		existresult.remove();
	}
	
	const resulttext = document.createElement("p");
	resulttext.classList.add("scoretext");
	resulttext.innerText = "총점: " + score + "점";
	scorecontain.appendChild(resulttext);
	
	console.log("Score:", score);
	console.log("Score container exists:", !!document.querySelector(".scorecontain"));

	
}

function explain(tIdx) {
	const explanation = [
		"개인 정보는 중고 거래에서도 쉽게 악용될 수 있으므로 직접 만날 수 없는 거래는 진행하지 않는 것이 안전하다",
		"약관을 하나씩 정독하고 동의 여부를 판단하세요.",
        "문자에 포함된 번호가 아닌 공식 번호로 문의하세요.",
        "공공 와이파이 연결은 위험하니 집에 가서 연결하세요.",
        "프로필 사진과 자기소개는 최대한 개인정보를 포함하지 마세요.",
        "출처가 불분명한 이벤트는 참여하지 마세요.",
        "USB 대신 이메일이나 클라우드로 자료를 요청하세요.",
        "비밀번호를 안전하게 변경하세요.",
        "의심스러운 파일은 다운로드하지 마세요.",
        "친구인지 확인 후, 필요한 경우 기존 연락처로 확인하세요.",
    ];

    return explanation[tIdx];
}

function addAnswer(answertext, tIdx, point){
	var a= document.querySelector('.answerbox');
	var answer = document.createElement('button');
	answer.classList.add('answerlist');
	a.appendChild(answer);
	answer.innerHTML =answertext; 
	
	answer.addEventListener("click", function(){
		var children = document.querySelectorAll('.answerlist');
		for(let i=0; i < children.length; i++){
			children[i].disabled = true;
			children[i].style.display = 'none';
		}
		
		score +=point;
		
		const explanationbox = document.querySelector(".testbox");
		explanationbox.innerHTML = "<p>이렇게 하세요: " + explain(tIdx) + "</p>";
		
		setTimeout(function() {
			goNext(tIdx+1);
			}, 2000)
		goNext(++tIdx);
	}, false);
}

function goNext(tIdx){
	if(tIdx+1 === endpoint){
		gotresult();
		return;
	}
	
	var t = document.querySelector('.testbox');
	var a = document.querySelector('.answerbox');
	
	t.innerHTML = testlist[tIdx].t;
	a.innerHTML ="";
	for(let i in testlist[tIdx].a){
		addAnswer(testlist[tIdx].a[i].answer, tIdx, testlist[tIdx].a[i].point);
   }
}

function begin(){
	score = 0;
	startpage.style.display = "none";
	testpage.style.display = "block";
	resultpage.style.display = "none";
	let tIdx = 0;
	goNext(tIdx);
}


