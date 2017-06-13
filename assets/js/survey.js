import {QuestionText} from './question.js'
import $ from 'jquery'

let csrftoken = getCookie('csrftoken')

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
})

class Survey {

    constructor() {
	this.questions = []
	this.questionsElement = document.getElementById("questions")

	this.createElement()

    }

    createElement() {
	this.title = () => {
	    return $("#surveyTitle").val()
	}

	this.description = () => {
	    return $("#surveyDescription").val()
	}
    }

    createQuestionText() {
	let question = new QuestionText(this.questionsElement)
	this.questions.push(question)

    }

    data() {
	let data = {}

	data.questions = []
	data.title = this.title()
	data.description = this.description()
	
	this.questions.forEach((current, index, array) => {
	    data.questions.push(current.data())
	})


	return data
    }

    submit() {
	let data = this.data()
	$.post('http://localhost:8000/create-survey/', data)
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export {Survey}
