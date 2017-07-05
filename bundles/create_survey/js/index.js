import $ from "jquery";
import {Survey} from './survey.js'

$(document).ready(function() {
    //  Get Questions div
    let questions = $("#questions")

    // Set up in-memory model
    // TOOD errors
    let survey = new Survey(id)

    // Create question on buttons
    $("#btnNewTextQuestion").click(() => {
	survey.createQuestionText()
    })

    $("#btnNewMultipleChoiceQuestion").click(() => {
	survey.createQuestionDropDown()
    })

    // Submit handler
    $("#btnSubmit").click(() => {
	let err = survey.submit()
    })

})

