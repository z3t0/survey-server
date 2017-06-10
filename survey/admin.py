
from django.contrib import admin

from .models import Question, Survey, Category

# Register your models here.
admin.site.register(Category)
admin.site.register(Survey)
