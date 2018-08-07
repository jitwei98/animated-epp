module.exports = {

    select:function (selected,options) {

        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"') , '$&selected = "selected"');
    },
    list: function(items, options) {
        var out = "<ul>";

        for(var i=0, l=items.length; i<l; i++) {
            out = out + "<li>" + options.fn(items[i]) + "</li>";
        }

        return out + "</ul>";
    },

    question:function(items, options) {
        var out = "";
        var questionTracker = [];
        var len = 0;
        if(items.length>19){
            len = 20;
        }else{
            len = items.length;
        }
        for(var i=0; i<len; i++) {              //change l to change number of question
            var randomQuestion;
            do {
                randomQuestion = Math.floor(Math.random() * items.length); //random question number
            } while (existingQuestions(randomQuestion,questionTracker));
            questionTracker.push(randomQuestion);
            var ans = items[randomQuestion].answer;
            var ran = ans;
            var ranOrder = Math.floor(Math.random()*4);

            out += '<div class="slide"><div class="form-group"><div class="question" name=  QuestionSource' +randomQuestion +'>' + items[randomQuestion].question + "</div>\n" +
                "<div class='answers' >";

            for(var j=0 ;j<4;j++){             //number of choice
                ran =  randChose(ans);
                var ID = i*10+j;
                if (ranOrder == j){
                    out +="<div class='form-group' id=Q"+ ID + "><label> <input type='radio' id="+ ID + " value='"+ ans +"'"+ "name =Question"+ i +">"+ ans+ "ans"+  "</label></div>"
                }else{
                    out +="<div class='form-group' id=Q"+ ID + "><label> <input type='radio' id="+ ID + " value='"+ ran +"'"+ "name =Question"+ i +">"+ ran + "</label></div>"
                }
            }
            out += "</div></div></div>";

        }
        out += "<div class='slide' id='answerPage'>This is the Summery page</div>"
        out += '<div class="form-group"   style="display:none;" ><input type="text" name="quesionArray" cols="30" rows="10" class="form-control" id="quesionArray" value= '
            + questionTracker.join(",") + '></div>';

        return out ;
    },

};
function randChose(ans) {
    var ran;
    do {
        ran = (Math.random() * (ans * 4));
        ran = ran.toFixed(2);
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