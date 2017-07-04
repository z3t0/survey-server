import {QuestionText} from './questionText.js'
import {QuestionDropDown} from './questionDropDown.js'
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

    constructor(id) {
	this.questions = []
	this.questionsElement = document.getElementById("questions")
	this.questionNumber = 0

	if (id) {
	    this.id = id

	    $.ajax({
		url: 'http://localhost:8000/survey-data/',
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		data: {id: id},
		dataType: 'text',
		success: (res) => {
		    let data = JSON.parse(res)

		    console.log(data)

		    $("#surveyTitle").val(data.name)
		    $("#surveyTitle").focus()
		    $("#surveyDescription").val(data.description)
		    $("#surveyDescription").focus()

		    data.questions.forEach((question) => {
			if (question.type == 'text') {
			    let opts = {data: question}
			    this.createQuestionText(opts)
			}
		    })
		} 
	    })

	}


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

    createQuestionDropDown() {
	let question = new QuestionDropDown(this.questionsElement)
	question.init(++this.questionNumber)
	this.questions.push(question)
    }

    createQuestionText(opts) {

	let question = new QuestionText(this.questionsElement, opts)

	question.init(++this.questionNumber)
	this.questions.push(question)
    }

    data() {
	let data = {}

	data.questions = []
	data.title = this.title()
	data.description = this.description()
	data.id = this.id
	data.errors = []

	this.questions.forEach((current, index, array) => {
	    let info = current.data()

	    if (info.error)
		data.errors.push({question: current, error: info.error})

	    data.questions.push(info.data)
	})

	return data
    }

    validate(data) {
	let errors = []
	
	// Validate
	if (data.title == "") {
	    errors.push("Please enter a title")
	}

	if (data.questions.length == 0) {
	    // no questions
	    errors.push("Please create some questions")
	}

	let questionError = false
	data.errors.forEach((info) => {
	    let err = info.error
	    let question = info.question

	    if (err) {
		question.errorText(err)

		if (!questionError) {
		    errors.push("Please check your questions")
		}
		questionError = true
	    }
	})

	return errors
    }

    submit() {
	let data = this.data()

	let err = this.validate(data)

	if (err.length != 0)
	    return err

	console.log(data)

	$.ajax({
	    url: 'http://localhost:8000/survey-create/',
	    type: 'POST',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(data),
	    dataType: 'text',
	    success: function(result) {
		console.log('success')
		try {
		    result = JSON.parse(result)
		    window.location = result.url
		}

		catch (e) {
		    console.error('failed to submit survey data')
		    console.error(e)
		}
	    }
});
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
