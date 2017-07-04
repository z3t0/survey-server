from django.conf.urls import url

from . import views

app_name = 'survey'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^survey-create/(?P<survey_id>[0-9]+)$', views.createSurvey, name='survey_create'),
    url(r'^survey-create/$', views.createSurvey, name='survey_create'),
    url(r'^survey-edit/(?P<survey_id>[0-9]+)$', views.editSurvey, name='survey_edit'),
    url(r'^survey-fill/(?P<survey_id>[0-9]+)$', views.fillSurvey, name='survey_fill'),
    url(r'^survey-results/(?P<survey_id>[0-9]+)$', views.resultsSurvey, name='survey_results'),
    url(r'^survey-data/$', views.dataSurvey, name='survey_data'),
    url(r'^survey-delete/$', views.deleteSurvey, name='survey_delete'),
]
