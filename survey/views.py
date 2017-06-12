from django.shortcuts import render


def createSurvey(request):

    if request.method == "POST":
        import pprint
        pp = pprint.PrettyPrinter(indent = 4)
        pp.pprint(request.POST)

    return render(request, 'survey/create_survey.html')
