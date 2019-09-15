module.exports = {

    question:function(items, TotalMark) {
        var out = "";
        var questionTracker = [];
        var len = 0;
        if(items.length>TotalMark){
            len = TotalMark;
        }else{
            len = items.length;
        }
        out += "<div id='quiz-container'  class='container pb-5'>";
        for(var i=0; i<len; i++) {              //change l to change number of question
            var randomQuestion;
            do {
                randomQuestion = Math.floor(Math.random() * items.length); //random question number
            } while (existingQuestions(randomQuestion,questionTracker));
            questionTracker.push(randomQuestion);
            var ans = items[randomQuestion].answer;
            var ran = ans;
            var ranOrder;
            var chooseTracker =[];
            for(let i=0;i<4;i++) {
                do {
                    ranOrder = Math.floor(Math.random() * 4); //random question number
                } while (existingQuestions(ranOrder, chooseTracker));
                chooseTracker.push(ranOrder);
            }
            console.log("hi");
            console.log(chooseTracker);
            out += '<div class="slide"><div class="form-group card m-3"><div class="question card-header" name=  QuestionSource' +randomQuestion +'>' + items[randomQuestion].question + "</div>\n" +
                "<div class='answers'>";
            out += "<div class='card-body ml-3'>";
            if(items[randomQuestion].image){
                out +="<div> <img style='display:block; width:600px;height:300px;' id='base64image' src= 'data:image/jpeg;base64," + items[randomQuestion].image + " ' >" + "</div>";
            }
            for(var j=0 ;j<4;j++){             //number of choice

                ran =  randChose(ans,items[randomQuestion].dp);
                var ID = i*10+j;
                if (chooseTracker[0] == j){
                    out +="<div class='form-group radio' id=Q"+ ID + "> <label><input type='radio' id="+ ID + " value='"+ ans +"'"+ "name =Question"+ i +">"+ ans + "  "+ "ans"+  "</label></div>"
                }else if(items[randomQuestion].wrongAnswer1 !=null && chooseTracker[1] == j){

                    let ws1 = items[randomQuestion].wrongAnswer1;
                    console.log(ws1);
                    out +="<div class='form-group radio' id=Q"+ ID + "> <label><input type='radio' id="+ ID + " value='"+ ws1 +"'"+ "name =Question"+ i +">"+ ws1+ "  "+ "ws1"+  "</label></div>"
                } else if(items[randomQuestion].wrongAnswer2 !=null && chooseTracker[2] == j){
                    let ws2 = items[randomQuestion].wrongAnswer2;
                    out +="<div class='form-group radio' id=Q"+ ID + "> <label><input type='radio' id="+ ID + " value='"+ ws2 +"'"+ "name =Question"+ i +">"+ ws2 +"  "+ "ws2"+  "</label></div>"
                }else if(items[randomQuestion].wrongAnswer3 !=null && chooseTracker[3] == j){
                    let ws3 = items[randomQuestion].wrongAnswer3;
                    out +="<div class='form-group radio' id=Q"+ ID + "> <label><input type='radio' id="+ ID + " value='"+ ws3 +"'"+ "name =Question"+ i +">"+ ws3+  " "+ "ws3"+  "</label></div>"
                }else{
                    out +="<div class='form-group radio' id=Q"+ ID + "><label><input type='radio' id="+ ID + " value='"+ ran +"'"+ "name =Question"+ i +">"+ ran + "</label></div>"
                }

            }
            out += "</div></div></div></div>";

        }
        out += "<div class='slide' id='answerPage'>This is the Summery page</div>"
        out += '<div class="form-group"   style="display:none;" ><input type="text" name="questionArray" cols="30" rows="10" class="form-control" id="questionArray" value= '
            + questionTracker.join(",") + '></div>';
        out += '</div>';
        return out ;
    },
};
function randChose(ans, dp) {
    var ran;
    do {
        ran = (Math.random() * (ans * 4));
        ran = ran.toFixed(dp);
    } while(ran == ans);
    return ran;
}
function existingQuestions(randomQuestion,questionTracker){
    for (let i = 0; i < questionTracker.length; i++) {
        if (questionTracker[i] === randomQuestion) {

            return true;
        }
    }
    return false;

}