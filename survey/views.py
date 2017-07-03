from django.shortcuts import render
import json
from django.contrib.auth.decorators import login_required
from .models import Question, QuestionText, QuestionDropDown, Survey


@login_required
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

def index(request):

    surveys = Survey.objects.all().order_by('-date')
    context = {'surveys': surveys}

    print(surveys)

    return render(request, 'survey/index.html', context)
