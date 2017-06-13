import $ from "jquery";
import {Survey} from './survey.js'

$(document).ready(function() {
    //  Get Questions div
    let questions = $("#questions")

    // Set up ine memory model
    // TODO load from django for editing and errors
    // TOOD errors
    let survey = new Survey()

    // Create question on buttons
    $("#btnNewTextQuestion").click(() => {
	survey.createQuestionText()
    })

    $("#btnNewQuestionMultipleChoice").click(() => {
    })

    // Submit handler
    $("#btnSubmit").click(() => {
	console.log(survey.data())
	survey.submit()
    })

})

function BuildQuestion(el, survey) {
    
    // DOM
    let div = document.createElement('div')

    let div2 = document.createElement('div')
    let questionText = document.createElement('input')
    questionText.type = 'text'
    questionText.placeholder = 'My question is..'
    div2.appendChild(questionText)
    
    let div3 = document.createElement('div')
    let description = document.createElement('input')
    description.type = 'text'
    description.placeholder = 'Description is...'
    div3.appendChild(description)


    div.appendChild(div2)
    div.appendChild(div3)

    // id, name, description

    let question = {}
    question.id = survey.questions.length

    question.name = () => {
	return questionText.value
    }
    question.description = () => {
	return description.value
    }

    survey.questions.push(question)

    el.append(div)

    console.log(el)
}
