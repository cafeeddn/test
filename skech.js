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
		"자신의 개인정보가 신뢰할 수 없는 곳에 쓰인다는 내용을 포함하거나 다양한 방법으로 자신의 개인정보에 위해를 가할 수 있기 때문에 개인정보이용약관은 항상 꼼꼼히 확인해야 한다.",
        "저장되지 않은 연락처에서 링크를 누르라거나 이상한 번호로 전화를 달라는 문자가 오면 피싱일 수 있으니 절대 무언가를 실행하지 않는다.",
        "화이트해커 박찬암씨는 ‘유퀴즈 온더 블록’에 출연해 해킹을 당하지 않는 방법을 묻는 질문에 “공공와이파이는 절대 안 쓴다.”, “공공와이파이는 웬만하면 해킹된다고 생각한다.”라고 말한 바 있다. 그만큼 공공와이파이는 개인정보에 취약하니 사용하지 않는 것이 좋다.",
        "SNS에서 얼굴이 노출되는 사진이나 개인 정보가 포함된 내용을 공개적으로 작성하면, 악의적인 사람들이 이를 악용할 수 있으니 최소한의 정보만 공개하거나 익명성을 유지하는 것이 중요하다.",
        "출처가 명확하지 않은 이벤트에서 개인 정보를 요구할 경우, 피싱 사기나 개인정보 유출로 이어질 수 있으므로 절대 정보를 제공하지 않는다.",
        " USB를 통한 악성코드 감염 사례가 많으므로 USB 사용 시 반드시 바이러스 검사를 하거나, 안전한 공유 방법을 사용하는 것이 개인정보를 보호하는 데 중요하다.",
        "비밀번호를 안전하게 변경하고, 주기적으로 비밀번호를 바꿔주어야한다.",
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
		const nextButton = document.createElement('button');
        nextButton.innerText = "다음";
        nextButton.classList.add('nextButton');
        explanationbox.appendChild(nextButton);

        nextButton.addEventListener("click", function() {
			goNext(tIdx+1 ) ;
			}, 2000)
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
