
from django.contrib import admin

from .models import Question, Survey, Category

# Register your models here.
admin.site.register(Question)
admin.site.register(Category)


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 3


class SurveyAdmin(admin.ModelAdmin):
    fields = ['name', 'author', 'description', 'date', 'category']

    inlines = [QuestionInline]


admin.site.register(Survey, SurveyAdmin)
