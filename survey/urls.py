from django.conf.urls import url

from . import views

app_name = 'survey'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^create-survey/$', views.createSurvey, name='create_survey'),
    url(r'^survey-edit/(?P<survey_id>[0-9]+)$', views.editSurvey, name='survey_edit'),
    url(r'^survey-fill/(?P<survey_id>[0-9]+)$', views.fillSurvey, name='survey_fill'),
    url(r'^survey-results/(?P<survey_id>[0-9]+)$', views.resultsSurvey, name='survey_results'),
    url(r'^survey-data/$', views.dataSurvey, name='survey_data'),
]
