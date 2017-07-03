from django.shortcuts import render
import json

from .models import Question, QuestionText, QuestionDropDown, Survey


def createSurvey(request):

    if request.method == "POST":
        data = json.loads(request.body)
        print(data)

        # Survey data
        survey = Survey(name= data["title"], description=data["description"])
        survey.save()

        # Question data
        for question in data['questions']:
            """ Text Question """
            if question['type'] == 'text':
                print(question)
                try:
                    q = QuestionText(name=question["questionText"], index=question["order"], survey=survey)
                    q.save()
                except:
                    print("an error occured while creating a text question")

            elif question['type'] == 'dropdown':
                print(question)
            else:
                print("Unsupported Question type: " + question["type"])
            

    return render(request, 'survey/create_survey.html')
