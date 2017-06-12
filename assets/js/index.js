import $ from "jquery";

window.onload = function() {
    let questions = document.getElementById('questions')

    $("%btnNewQuestionText").click(() => {

    // Form Builder
    document.getElementById('btnNewQuestionText').addEventListener('click', () => {
	BuildQuestionText(questions)
    })

    document.getElementById('btnNewQuestionDropDown').addEventListener('click', () => {
	ChoiceQuestionBuilder(questions, 'dropdown')
    })

    document.getElementById('btnNewQuestionMultipleChoice').addEventListener('click', () => {
	ChoiceQuestionBuilder(questions, 'multiplechoice')
    })
}

function ChoiceQuestionBuilder(el, typename) {
    let {div, name}  = BuildQuestion(el)
	
    // type of this question as hidden field
    let type = document.createElement('input')
    type.name = 'type'
    type.type = 'hidden'
    type.value = typename

    let div2 = document.createElement('div')
    div.appendChild(type)

    // choices for this question
    let divChoices = document.createElement('div')

    // Button for creating new choices
    let div4 = document.createElement('div')
    let newButton = document.createElement('input')
    newButton.value = 'Add a choice'
    newButton.type = 'button'
    newButton.addEventListener('click', ()=>{
	let divChoice = document.createElement('div')

	let choiceText = document.createElement('input')
	choiceText.type = 'text',
	choiceText.value = 'Choice ' + (divChoices.childElementCount + 1)
	choiceText.name = name + '.choice_' + (divChoices.childElementCount + 1)

	divChoice.appendChild(choiceText)

	divChoices.appendChild(divChoice)
    })

    div4.appendChild(newButton)

    div.appendChild(div2)
    div.appendChild(div4)
    div.appendChild(divChoices)

    div.className = 'questionDropDown'

    div.appendChild(div2)
    el.appendChild(div)
}

// el: the element to add the question to, used to get number
// need a better way to do this
function BuildQuestionText(el) {
    let {div, name}  = BuildQuestion(el)
	
    // type of this question as hidden field
    let type = document.createElement('input')
    type.name = name + '.type'
    type.type = 'hidden'
    type.value = 'text'


    div.appendChild(type)

    el.appendChild(div)
}

function BuildQuestion(el) {
    // Get question number
    let name = "question_" + (el.childElementCount + 1)

    // main div
    let div = document.createElement('div')

    // Name of question
    let div2 = document.createElement('div')
    let questionName = document.createElement('input')
    questionName.type = 'text'
    questionName.value = "Enter Question"
    questionName.name = name + '.name'
    div2.appendChild(questionName)

    // Description of question
    let div3 = document.createElement('div')
    let questionDescription = document.createElement('textarea')
    questionDescription.value = 'Description'
    questionDescription.name = name + '.description'
    div3.appendChild(questionDescription)

    // add to main div
    div.appendChild(div2)
    div.appendChild(div3)

    // css
    div.className = "question"

    div.name = name
    console.log(div)

    return {div:div, name: name}
}
