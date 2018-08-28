var panel = $("#questions-div");

// Question set
var questions = [{
  question: "The martial art kung fu originated in which country?",
  answers: ["Japan", "Korea", "China", "France"],
  correctAnswer: "China"
}, {
  question: "What is the most common blood type in humans?",
  answers: ["A+", "O+", "AB+", "A-"],
  correctAnswer: "O+"
}, {
  question: "When was Google founded?",
  answers: ["1996", "2000", "1998", "2002"],
  correctAnswer: "1998"
}, {
  question: "Largest Tech Company?",
  answers: ["Apple", "Microsoft", "Facebook", "Amazon"],
  correctAnswer: "Apple"
}, {
  question: "Which NFL team has the most Super Bowl wins?",
  answers: ["Oakland Raiders", "Dallas Cowboys", "New England Patriots", "Pittsburgh Steelers"],
  correctAnswer: "Pittsburgh Steelers"
}, {
  question: "Who said: 'We are a way for the Cosmos to know itself' ?",
  answers: ["Galileo Galilei", "Albert Einstein", "Carl Sagan", "Johannes Kepler"],
  correctAnswer: "Carl Sagan"
}, {
  question: "What is the most popular programming language?",
  answers: ["JavaScript", "HTML", "Java", "CSS"],
  correctAnswer: "JavaScript"
}, {
  question: "Who smokes weed in 'That 70's show' ?",
  answers: ["Kelso", "Fez", "Hyde", "All of them"],
  correctAnswer: "All of them"
}];

// Variable that will hold the setInterval
var timer;

var game = {

  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#data-container").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      panel.append("<h2 id='question'>"  + (i+1) + ". " + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append("<input type='radio' id='question-input' name='question-" + i +
        "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    panel.append("<button id='done'>Done</button>");
  },

  done: function() {

    for (var i = 0; i < questions.length; i++) {
      $.each($("input[name='question-" + i + "']:checked"), function() {
        if ($(this).val() === questions[i].correctAnswer) {
          game.correct++;
        }
        else {
          game.incorrect++;
        }
      });
    }

    this.result();

  },

  result: function() {

    clearInterval(timer);

    $("#data-container h2").remove();

    panel.html("<h2>All Done!</h2>");
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});


$(document).on("click", "#done", function() {
  game.done();
});
