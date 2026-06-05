const params = new URLSearchParams(location.search);

const type =
params.get("type") || "zeirishiBoki";

window.quizData[type] ||
window.quizData.zeirishiBoki;

const quizInfo = {

  zeirishiBoki:{
    title:"税理士試験 簿記論",
    desc:"仕訳・決算整理・本支店会計"
  },

  zeirishiZaimu:{
    title:"税理士試験 財務諸表論",
    desc:"企業会計原則・会計理論"
  },

  zeirishiSyotoku:{
    title:"税理士試験 所得税法",
    desc:"所得区分・所得控除"
  },

  zeirishiSyotokuAdvanced:{
    title:"税理士試験 所得税法 応用",
    desc:"計算問題・申告実務"
  },

  zeirishiHoujin:{
    title:"税理士試験 法人税法",
    desc:"益金・損金・別表"
  },

  zeirishiHoujinAdvanced:{
    title:"税理士試験 法人税法 応用",
    desc:"別表四・別表五"
  },

  zeirishiSyouhi:{
    title:"税理士試験 消費税法",
    desc:"課税取引・インボイス"
  },

  zeirishiSouzoku:{
    title:"税理士試験 相続税法",
    desc:"財産評価・相続税計算"
  },

  zeirishiKotei:{
    title:"税理士試験 固定資産税",
    desc:"土地・家屋・償却資産"
  },

  zeirishiKokucho:{
    title:"税理士試験 国税徴収法",
    desc:"督促・差押・公売"
  },

  zeirishiJumin:{
    title:"税理士試験 住民税",
    desc:"所得割・均等割"
  },

  zeirishiJigyou:{
    title:"税理士試験 事業税",
    desc:"個人事業税・法人事業税"
  },

  zeirishiSake:{
    title:"税理士試験 酒税法",
    desc:"酒類分類・税率"
  },

  zeirishiMix:{
    title:"税理士試験 総合演習",
    desc:"全科目ミックス"
  }

};




const allQuestions =
  window.quizData?.[type] || window.quizData.zeirishiBoki;

const info = quizInfo[type] || quizInfo.zeirishiBoki;

document.title = info.title;

document.getElementById("pageTitle").textContent = info.title;
document.getElementById("pageDesc").textContent = info.desc;

const quizList = document.getElementById("quizList");

quizList.innerHTML = Object.keys(quizInfo).map(key => `
<a href="?type=${key}"
class="${key === type ? 'active' : ''}">
${quizInfo[key].title}
</a>
`).join("");

function shuffle(array){
  return [...array].sort(() => Math.random() - 0.5);
}

let questions = shuffle(allQuestions).slice(0,50);
let current = 0;
let score = 0;
let answered = false;

function showQuestion(){
  if(current >= questions.length){
    finishQuiz();
    return;
  }

  answered = false;
  const q = questions[current];

  document.getElementById("counter").textContent =
    `${current + 1} / ${questions.length}`;

  document.getElementById("score").textContent =
    `スコア: ${score}`;

  document.getElementById("question").textContent = q.q;
  document.getElementById("result").textContent = "";

  document.getElementById("progressBar").style.width =
    `${(current / questions.length) * 100}%`;

  document.getElementById("choices").innerHTML =
    shuffle(q.c).map(choice => `
      <button type="button" data-choice="${choice}">
        ${choice}
      </button>
    `).join("");

  document.querySelectorAll("#choices button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      checkAnswer(btn, btn.dataset.choice);
    });
  });
}

function checkAnswer(button, choice){
  if(answered) return;
  answered = true;

  const q = questions[current];
  const buttons = document.querySelectorAll("#choices button");

  buttons.forEach(btn=>{
    btn.disabled = true;

    if(btn.dataset.choice === q.a){
      btn.classList.add("correct");
    }
  });

  if(choice === q.a){
    score++;
    button.classList.add("correct");
    document.getElementById("result").textContent = "正解！";
  }else{
    button.classList.add("wrong");
    document.getElementById("result").textContent =
      `不正解！ 正解は「${q.a}」`;
  }

  document.getElementById("score").textContent =
    `スコア: ${score}`;

  setTimeout(()=>{
    current++;
    showQuestion();
  },1200);
}

function finishQuiz(){
  document.getElementById("counter").textContent = "終了";
  document.getElementById("question").textContent = "結果発表";
  document.getElementById("progressBar").style.width = "100%";

  document.getElementById("choices").innerHTML = `
    <div class="finish">
      <p>${questions.length}問中 ${score}問正解！</p>
      <button onclick="location.reload()">もう一度遊ぶ</button>
    </div>
  `;

  document.getElementById("result").textContent = "";
}

showQuestion();
