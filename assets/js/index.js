window.onload = function() {
    let questions = document.getElementById('questions')
    // Form Builder
    document.getElementById('btnNewQuestionText').addEventListener('click', () => {
	let div = document.createElement('div')


	let div2 = document.createElement('div')
	let questionName = document.createElement('input')
	questionName.type = 'text'
	questionName.value = "Enter Question"
	div2.appendChild(questionName)

	let div3 = document.createElement('div')
	let questionDescription = document.createElement('textarea')
	questionDescription.value = 'Description'
	div3.appendChild(questionDescription)

	div.appendChild(div2)
	div.appendChild(div3)

	div.className = "question"

	questions.appendChild(div)
    })

    document.getElementById('btnNewQuestionDropDown').addEventListener('click', () => {
    })

    document.getElementById('btnNewQuestionMultipleChoice').addEventListener('click', () => {
    })
}
